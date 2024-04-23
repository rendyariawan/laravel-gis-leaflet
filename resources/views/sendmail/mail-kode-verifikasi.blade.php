<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation Code</title>
    <style>
        /* Reset CSS */
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        /* Wrapper */
        .wrapper {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f3f3f3;
        }
        /* Header */
        .header {
            text-align: center;
            background-color: #42A5F5;
            color: #ffffff;
            padding: 20px;
        }
        /* Body */
        .body-content {
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        /* Code Section */
        .code-section {
            background-color: #E1F5FE;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            color: #2196F3;
        }
        /* Button */
        .button {
            display: inline-block;
            background-color: #42A5F5;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
            transition: background-color 0.3s ease;
            margin-bottom: 20px;
            align-items: center;
        }
        /* Footer */
        .footer {
            text-align: center;
            padding: 10px;
            background-color: #42A5F5;
            color: #ffffff;
            border-radius: 0 0 8px 8px;
        }
        .button-center {
            text-align: center;
            align-content: center;
            align-items: center;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <!-- Header -->
        <div class="header">
            <h1>Confirmation Code</h1>
        </div>

        <!-- Body Content -->
        <div class="body-content">
            <p>Hello {{ $data['name'] }},</p>
            <p>Your confirmation code is:</p>
            <!-- Code Section -->
            <div class="code-section">
                <span class="code">{{ $data['token'] }}</span>
            </div>
            <!-- Button -->
            <!-- <div class="button-center">
                <a href="#" class="button">Confirm</a>
            </div> -->
            <p>Please use this code to proceed with your action.</p>
            <p>Regards,<br>Your Company</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>&copy; 2022 Your Company</p>
        </div>
    </div>
</body>
</html>
