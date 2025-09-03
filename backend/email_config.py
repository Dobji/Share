from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr
from typing import List
import os
from dotenv import load_dotenv

# Get current directory and load environment variables
current_dir = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(current_dir, "config.env")

# Load environment variables
if os.path.exists(config_path):
    load_dotenv(config_path)

# Email configuration for Gmail
email_config = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME", "vova.shtuca123@gmail.com"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD", ""),
    MAIL_FROM=os.getenv("MAIL_FROM", "vova.shtuca123@gmail.com"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", "587")),
    MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
    MAIL_FROM_NAME=os.getenv("MAIL_FROM_NAME", "СтройМакс"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

# Initialize FastMail
fastmail = FastMail(email_config)

async def send_contact_notification(contact_data: dict):
    """
    Send notification email when contact form is submitted
    """
    try:
        # Email to admin
        admin_message = MessageSchema(
            subject="Новое сообщение с сайта СтройМакс",
            recipients=["vova.shtuca123@gmail.com"],  # Use string directly instead of EmailStr()
            body=f"""
            Новое сообщение с сайта СтройМакс:
            
            Имя: {contact_data.get('name', 'Не указано')}
            Email: {contact_data.get('email', 'Не указан')}
            Телефон: {contact_data.get('phone', 'Не указан')}
            Сообщение: {contact_data.get('message', 'Не указано')}
            
            Время отправки: {contact_data.get('created_at', 'Не указано')}
            """,
            subtype="html"
        )
        
        await fastmail.send_message(admin_message)
        
        # Auto-reply to user
        user_message = MessageSchema(
            subject="Спасибо за ваше сообщение - СтройМакс",
            recipients=[contact_data.get('email')],  # Use string directly instead of EmailStr()
            body=f"""
            <html>
            <body>
                <h2>Спасибо за ваше сообщение!</h2>
                <p>Уважаемый(ая) {contact_data.get('name', 'клиент')},</p>
                <p>Мы получили ваше сообщение и свяжемся с вами в ближайшее время.</p>
                <p><strong>Ваше сообщение:</strong></p>
                <p>{contact_data.get('message', '')}</p>
                <br>
                <p>С уважением,<br>Команда СтройМакс</p>
                <br>
                <p><small>Это автоматическое сообщение, не отвечайте на него.</small></p>
            </body>
            </html>
            """,
            subtype="html"
        )
        
        await fastmail.send_message(user_message)
        return True
        
    except Exception as e:
        print(f"Error sending email: {e}")
        return False 