// sendOtp.js
export default function (otp) {
    return `
      <html>
      <head>
        <title>Your OTP Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 80%;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 10px;
          }
          h1 {
            color: #333;
          }
          p {
            font-size: 16px;
            color: #555;
          }
          .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
            margin: 20px 0;
          }
          .instructions {
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <p>Your One-Time Password (OTP) for verifying your email is:</p>
          <div class="otp-code">${otp}</div>
          <p>Please enter this OTP in the verification form to complete the process.</p>
          <div class="instructions">
            <h3>Important Instructions:</h3>
            <ul>
              <li>This OTP is valid for 10 minutes.</li>
              <li>Do not share your OTP with anyone for security reasons.</li>
              <li>If you did not request this, please contact support immediately.</li>
            </ul>
          </div>
          <p>If you have any questions or need further assistance, feel free to reach out to us.</p>
          <p>Best regards, <br> The Support Team</p>
        </div>
      </body>
      </html>
    `;
  };
  