// userDetails.js
export default function (name, link) {
  return `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Approved</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #f8f9fa;
            margin-bottom: 20px;
        }
        .content {
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
        }
        .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeeba;
            color: #856404;
            padding: 12px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 12px;
            color: #6c757d;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Registration Approved! 🎉</h1>
    </div>
    
    <div class="content">
        <p>Dear ${name},</p>
        
        <p>Congratulations! Your Job letter has been approved by our administrative team. We're excited to have you join our platform.</p>
        
        <p>To complete your registration, please click the button below:</p>
        
        <center>
            <a href="${link}" class="button">Complete Registration</a>
        </center>
        
        <div class="warning">
            <strong>Important Notes:</strong>
            <ul>
                <li>This registration link is valid for 2 days only</li>
                <li>The link will expire on [EXPIRY_DATE]</li>
                <li>This link is unique to you - please do not share it with anyone</li>
            </ul>
        </div>
        
        <p>If you have any issues completing your registration or if the link expires, please contact our support team at [SUPPORT_EMAIL].</p>
        
        <p>Welcome aboard!</p>
        <p>Best regards,<br>Target Academy Team</p>
    </div>
    
    <div class="footer">
        <p>This is an automated message, please do not reply to this email.</p>
        <p>Target Academy - Umred</p>
        <p>© 2025 Target Academy. All rights reserved.</p>
    </div>
</body>
</html>
    `;
}
