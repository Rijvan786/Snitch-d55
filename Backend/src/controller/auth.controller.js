import { config } from "../config/config.js"
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { validatedAndFormat } from "../validator/contact.validator.js"
import bcrypt from "bcryptjs"
import BlackListModel from "../models/BlackList.model.js"
import { SendMailDynamicContent } from "../services/email.service.js"

// Application Client & Base URLs
const CLIENT_URL ="https://snitch-d55.onrender.com" || "http://localhost:5173"
const BASE_URL = "https://snitch-d55.onrender.com" || `http://localhost:${config.PORT || 3000}`

/* ==========================================================================
   CLEAN MODERN MINIMALIST EMAIL TEMPLATE SUITE (Self-Contained)
   Design: Light aesthetic, high-contrast typography, minimalist cards,
           bulletproof HTML tables, inline styles, 1M+ user deliverability.
   ========================================================================== */

/**
 * Base Minimalist Email Layout Wrapper
 */
function renderMinimalEmailLayout({ title, preheader, content }) {
    return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    body { margin: 0; padding: 0; background-color: #F4F4F5; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; -webkit-font-smoothing: antialiased; }
    table { border-collapse: collapse; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; border-radius: 0 !important; }
      .content-padding { padding: 24px 20px !important; }
      .header-padding { padding: 20px 20px !important; }
      .mobile-stack { display: block !important; width: 100% !important; margin-bottom: 8px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F4F5; color: #18181B; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;">
  
  <!-- PREHEADER (Inbox snippet text) -->
  <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #F4F4F5; opacity: 0; mso-hide: all;">
    ${preheader} &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #F4F4F5; padding: 36px 12px;">
    <tr>
      <td align="center">
        <!-- EMAIL CARD (Max width 580px, clean white container) -->
        <table role="presentation" class="email-container" width="580" border="0" cellpadding="0" cellspacing="0" style="width: 580px; max-width: 580px; background-color: #FFFFFF; border: 1px solid #E4E4E7; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);">
          
          <!-- BRAND HEADER -->
          <tr>
            <td style="padding: 28px 36px; border-bottom: 1px solid #F4F4F5; background-color: #FFFFFF;" class="header-padding">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" valign="middle">
                    <span style="font-size: 26px; font-weight: 900; letter-spacing: -0.04em; color: #09090B; display: block; line-height: 1;">SNITCH</span>
                    <span style="font-size: 10px; font-weight: 700; letter-spacing: 0.16em; color: #71717A; text-transform: uppercase; margin-top: 4px; display: block;">Modern Streetwear Atelier</span>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 5px 12px; background-color: #F4F4F5; border-radius: 4px; font-size: 11px; font-weight: 700; color: #52525B; letter-spacing: 0.08em; text-transform: uppercase;">
                      Member Access
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DYNAMIC EMAIL CONTENT -->
          <tr>
            <td style="padding: 36px 36px;" class="content-padding">
              ${content}
            </td>
          </tr>

          <!-- VALUE PROPOSITIONS -->
          <tr>
            <td style="background-color: #FAFAFA; border-top: 1px solid #F4F4F5; padding: 22px 36px;" class="content-padding">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="mobile-stack" style="padding: 4px 6px 4px 0; font-size: 11px; font-weight: 600; color: #52525B;">
                    <span style="color: #09090B; font-weight: 700;">&#10003; Express Delivery</span> across India
                  </td>
                  <td class="mobile-stack" style="padding: 4px 6px; font-size: 11px; font-weight: 600; color: #52525B;">
                    <span style="color: #09090B; font-weight: 700;">&#10003; 7-Day Easy Returns</span> & Exchanges
                  </td>
                  <td class="mobile-stack" style="padding: 4px 0 4px 6px; font-size: 11px; font-weight: 600; color: #52525B;">
                    <span style="color: #09090B; font-weight: 700;">&#10003; 100% Original</span> Designer Apparel
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #F4F4F5; padding: 28px 36px; text-align: center;" class="content-padding">
              <p style="margin: 0 0 10px 0; font-size: 12px; color: #71717A; line-height: 1.5;">
                &copy; ${new Date().getFullYear()} SNITCH Inc. All rights reserved.<br>
                High-Street Atelier Complex, New Delhi / Mumbai / Global.
              </p>
              <div style="font-size: 11px; color: #A1A1AA;">
                <a href="${CLIENT_URL}" style="color: #52525B; text-decoration: underline; margin: 0 6px;">Storefront</a> &bull;
                <a href="${CLIENT_URL}/privacy" style="color: #52525B; text-decoration: underline; margin: 0 6px;">Privacy Policy</a> &bull;
                <a href="${CLIENT_URL}/contact" style="color: #52525B; text-decoration: underline; margin: 0 6px;">Customer Support</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`
}

/**
 * 1. Register Email Builder (Clean Minimalist E-Commerce)
 */
function buildRegisterEmail({ fullname, email, verificationUrl, token }) {
    const shortToken = token ? String(token).slice(-8).toUpperCase() : "VERIFY-NOW"
    const userGreeting = fullname ? fullname.trim() : "Valued Member"

    const content = `
      <div style="font-size: 11px; font-weight: 800; color: #2563EB; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 8px;">
        Account Verification Protocol
      </div>
      <h1 style="margin: 0 0 14px 0; font-size: 26px; font-weight: 800; color: #09090B; line-height: 1.2; letter-spacing: -0.02em;">
        Welcome to SNITCH, ${userGreeting}.
      </h1>
      <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #52525B;">
        Thank you for joining the SNITCH Collective. To activate your account, access member-only drops, and claim your first-order welcome gift, please verify your email address below.
      </p>

      <!-- VERIFICATION ACTION BOX -->
      <div style="background-color: #F8F9FA; border: 1px solid #E4E4E7; border-radius: 8px; padding: 26px; margin-bottom: 28px; text-align: center;">
        <div style="font-size: 11px; font-weight: 700; color: #71717A; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px;">
          One-Time Verification Key
        </div>
        <div style="font-size: 24px; font-weight: 900; letter-spacing: 0.22em; color: #09090B; font-family: monospace; margin-bottom: 18px;">
          ${shortToken}
        </div>

        <a href="${verificationUrl}" target="_blank" 
           style="display: inline-block; width: 85%; max-width: 340px; padding: 15px 24px; background-color: #09090B; color: #FFFFFF; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
          Verify Email Address &rarr;
        </a>

        <div style="font-size: 11px; color: #71717A; margin-top: 14px;">
          Valid for 24 hours &bull; Single-use cryptographic token
        </div>
      </div>

      <!-- EXCLUSIVE 10% WELCOME VOUCHER -->
      <div style="background-color: #FFFFFF; border: 1px dashed #CBD5E1; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px;">
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="left">
              <span style="font-size: 10px; font-weight: 800; color: #16A34A; letter-spacing: 0.14em; text-transform: uppercase; display: block;">
                New Member Privilege
              </span>
              <span style="font-size: 14px; font-weight: 700; color: #09090B; margin-top: 2px; display: block;">
                Enjoy 10% Off Your First Acquisition
              </span>
            </td>
            <td align="right">
              <span style="display: inline-block; padding: 6px 12px; background-color: #F1F5F9; border-radius: 4px; font-size: 13px; font-weight: 800; letter-spacing: 0.12em; color: #09090B; font-family: monospace;">
                WELCOME10
              </span>
            </td>
          </tr>
        </table>
      </div>

      <div style="font-size: 12px; color: #71717A; line-height: 1.5;">
        Button not working? Copy and paste this link into your browser:<br>
        <a href="${verificationUrl}" target="_blank" style="color: #2563EB; word-break: break-all; text-decoration: underline;">${verificationUrl}</a>
      </div>
    `

    return {
        subject: `Welcome to SNITCH // Please Verify Your Email Address`,
        text: `Welcome to SNITCH!\n\nHello ${userGreeting},\n\nPlease verify your email address to activate your account:\n${verificationUrl}\n\nYour Protocol Key: ${shortToken} (Valid for 24 Hours)\n\nWelcome Code: WELCOME10 for 10% off your first order.\n\nSNITCH Team`,
        html: renderMinimalEmailLayout({
            title: `Welcome to SNITCH // Verify Email`,
            preheader: `Confirm your email to complete your registration and claim 10% off your first order.`,
            content
        })
    }
}

/**
 * 2. Google OAuth Welcome & Security Alert (Clean Minimalist)
 */
function buildGoogleLoginEmail({ fullname, email, storefrontUrl }) {
    const userGreeting = fullname ? fullname.trim() : "Member"
    const loginTime = new Date().toUTCString()

    const content = `
      <div style="font-size: 11px; font-weight: 800; color: #16A34A; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 8px;">
        &#9679; Single Sign-On Authenticated
      </div>
      <h1 style="margin: 0 0 14px 0; font-size: 26px; font-weight: 800; color: #09090B; line-height: 1.2; letter-spacing: -0.02em;">
        Hello, ${userGreeting}.
      </h1>
      <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #52525B;">
        You have successfully logged in to your SNITCH account using your Google profile (<strong style="color: #09090B;">${email}</strong>).
      </p>

      <!-- AUDIT SUMMARY CARD -->
      <div style="background-color: #F8F9FA; border: 1px solid #E4E4E7; border-radius: 8px; padding: 22px; margin-bottom: 26px;">
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 6px 0; font-size: 12px; color: #71717A;">Signed-in Account</td>
            <td align="right" style="padding: 6px 0; font-size: 13px; font-weight: 700; color: #09090B;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 12px; color: #71717A;">Authentication Method</td>
            <td align="right" style="padding: 6px 0; font-size: 13px; font-weight: 600; color: #2563EB;">Google OAuth 2.0</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-size: 12px; color: #71717A;">Login Timestamp</td>
            <td align="right" style="padding: 6px 0; font-size: 12px; font-weight: 600; color: #52525B; font-family: monospace;">${loginTime}</td>
          </tr>
        </table>
      </div>

      <!-- PRIMARY CTA -->
      <div style="text-align: center; margin-bottom: 26px;">
        <a href="${storefrontUrl}" target="_blank" 
           style="display: inline-block; width: 85%; max-width: 340px; padding: 15px 24px; background-color: #09090B; color: #FFFFFF; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; border-radius: 6px;">
          Continue to Storefront &rarr;
        </a>
      </div>

      <!-- SECURITY NOTICE -->
      <div style="background-color: #FEF2F2; border-left: 3px solid #EF4444; border-radius: 0 4px 4px 0; padding: 12px 16px;">
        <div style="font-size: 11px; font-weight: 700; color: #991B1B; text-transform: uppercase;">
          Was this not you?
        </div>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #7F1D1D; line-height: 1.4;">
          If you did not authorize this login, someone may have compromised your Google account. Please secure your Google account immediately or contact <a href="mailto:security@snitch.co.in" style="color: #991B1B; text-decoration: underline;">security@snitch.co.in</a>.
        </p>
      </div>
    `

    return {
        subject: `Security Notification // Logged in via Google on SNITCH`,
        text: `SNITCH Security Notification\n\nHello ${userGreeting},\n\nYou successfully signed in to SNITCH via Google (${email}) on ${loginTime}.\n\nExplore collections: ${storefrontUrl}\n\nIf this was not you, secure your account immediately.\n\nSNITCH Team`,
        html: renderMinimalEmailLayout({
            title: `SNITCH // Google Sign-In Confirmation`,
            preheader: `You signed in to your SNITCH account via Google.`,
            content
        })
    }
}

/**
 * 3. Resend Verification Link Builder (Clean Minimalist)
 */
function buildResendEmail({ fullname, email, verificationUrl, token }) {
    const shortToken = token ? String(token).slice(-8).toUpperCase() : "ACTIVATE-NOW"
    const userGreeting = fullname ? fullname.trim() : "Member"

    const content = `
      <div style="font-size: 11px; font-weight: 800; color: #2563EB; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 8px;">
        Verification Dispatch Retransmission
      </div>
      <h1 style="margin: 0 0 14px 0; font-size: 26px; font-weight: 800; color: #09090B; line-height: 1.2; letter-spacing: -0.02em;">
        New Verification Link Issued.
      </h1>
      <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #52525B;">
        Hello ${userGreeting}, as requested, a fresh email verification link has been generated for your account (<strong style="color: #09090B;">${email}</strong>). Any previous verification links have been invalidated.
      </p>

      <!-- VERIFICATION ACTION BOX -->
      <div style="background-color: #F8F9FA; border: 1px solid #E4E4E7; border-radius: 8px; padding: 26px; margin-bottom: 26px; text-align: center;">
        <div style="font-size: 11px; font-weight: 700; color: #71717A; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px;">
          Fresh Protocol Key
        </div>
        <div style="font-size: 24px; font-weight: 900; letter-spacing: 0.22em; color: #09090B; font-family: monospace; margin-bottom: 18px;">
          ${shortToken}
        </div>

        <a href="${verificationUrl}" target="_blank" 
           style="display: inline-block; width: 85%; max-width: 340px; padding: 15px 24px; background-color: #09090B; color: #FFFFFF; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; border-radius: 6px;">
          Confirm Email Address &rarr;
        </a>

        <div style="font-size: 11px; color: #71717A; margin-top: 14px;">
          Valid for 24 hours &bull; Single-use cryptographic token
        </div>
      </div>

      <!-- RATE LIMIT POLICY -->
      <div style="font-size: 11px; color: #71717A; line-height: 1.5; margin-bottom: 16px;">
        <strong>Notice:</strong> For security compliance, verification requests are limited to 5 times per 24 hours. If you did not make this request, you can safely ignore this email.
      </div>

      <div style="font-size: 12px; color: #71717A; line-height: 1.5;">
        Direct link: <a href="${verificationUrl}" target="_blank" style="color: #2563EB; word-break: break-all; text-decoration: underline;">${verificationUrl}</a>
      </div>
    `

    return {
        subject: `New Verification Link // SNITCH Account Activation`,
        text: `SNITCH Verification Renewal\n\nHello ${userGreeting},\n\nA fresh verification key was requested for ${email}:\n${verificationUrl}\n\nProtocol Key: ${shortToken} (Valid for 24 Hours)\n\nSNITCH Team`,
        html: renderMinimalEmailLayout({
            title: `SNITCH // New Verification Link`,
            preheader: `Your new email verification link is ready. Valid for 24 hours.`,
            content
        })
    }
}

/**
 * 4. Forget Password Email Builder (Clean Minimalist)
 */
function buildForgetPasswordEmail({ fullname, email, resetUrl }) {
    const userGreeting = fullname ? fullname.trim() : "Member"

    const content = `
      <div style="font-size: 11px; font-weight: 800; color: #DC2626; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 8px;">
        Security Recovery Request
      </div>
      <h1 style="margin: 0 0 14px 0; font-size: 26px; font-weight: 800; color: #09090B; line-height: 1.2; letter-spacing: -0.02em;">
        Reset Your Password.
      </h1>
      <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #52525B;">
        Hello ${userGreeting}, we received a request to reset the password for your SNITCH account associated with <strong style="color: #09090B;">${email}</strong>.
      </p>

      <!-- RESET ACTION BOX -->
      <div style="background-color: #F8F9FA; border: 1px solid #E4E4E7; border-radius: 8px; padding: 26px; margin-bottom: 26px; text-align: center;">
        <div style="display: inline-block; padding: 4px 10px; background-color: #FEE2E2; border-radius: 4px; font-size: 11px; font-weight: 700; color: #991B1B; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 14px;">
          Expires in 15 Minutes
        </div>
        <p style="margin: 0 0 18px 0; font-size: 13px; color: #52525B;">
          Click the secure button below to choose a new password. This link is single-use.
        </p>

        <a href="${resetUrl}" target="_blank" 
           style="display: inline-block; width: 85%; max-width: 340px; padding: 15px 24px; background-color: #09090B; color: #FFFFFF; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; border-radius: 6px;">
          Reset My Password &rarr;
        </a>
      </div>

      <!-- SECURITY NOTICE -->
      <div style="background-color: #F4F4F5; border-radius: 6px; padding: 14px 18px; margin-bottom: 18px;">
        <div style="font-size: 11px; font-weight: 700; color: #27272A; text-transform: uppercase; margin-bottom: 4px;">
          Didn't request a password reset?
        </div>
        <p style="margin: 0; font-size: 12px; color: #71717A; line-height: 1.4;">
          If you didn't initiate this request, you can safely disregard this email. Your account remains completely secure and your password has not been altered.
        </p>
      </div>

      <div style="font-size: 12px; color: #71717A; line-height: 1.5;">
        Direct link: <a href="${resetUrl}" target="_blank" style="color: #2563EB; word-break: break-all; text-decoration: underline;">${resetUrl}</a>
      </div>
    `

    return {
        subject: `Reset Your SNITCH Password // Security Request`,
        text: `SNITCH Password Reset\n\nHello ${userGreeting},\n\nA password reset was requested for ${email}.\n\nReset link: ${resetUrl}\n\nNote: This link expires strictly in 15 minutes.\nIf you did not request this, ignore this email.\n\nSNITCH Team`,
        html: renderMinimalEmailLayout({
            title: `SNITCH // Password Reset Request`,
            preheader: `Reset your password for your SNITCH account. Link expires in 15 minutes.`,
            content
        })
    }
}


/* ==========================================================================
   CONTROLLER HELPERS
   ========================================================================== */

/*** Standard Status Code & Message Sender */
function SendStatusCode(res, code, message) {
    if (res && typeof res.status === "function") {
        return res.status(code).json({
            success: code < 400,
            message: message
        })
    }
}

/*** Token & Cookie Response Helper */
async function SendTokenResponse(res, user, message) {
    const token = jwt.sign(
        { id: user._id },
        config.JWT_SECRET,
        { expiresIn: "7d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return res.status(200).json({
        message,
        success: true,
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })
}


/* ==========================================================================
   ROUTE CONTROLLER ACTIONS
   ========================================================================== */

/*** Email Verification Route Controller */
export async function Email_Verification(req, res) {
    try {
        const { token } = req.query

        if (!token) {
            return res.status(400).send(`
                <div style="font-family:sans-serif; text-align:center; padding:40px; background:#F4F4F5; color:#18181B; min-height:100vh;">
                    <h2 style="color:#DC2626;">Verification Token Missing</h2>
                    <p style="color:#71717A;">Invalid or expired email verification link.</p>
                    <a href="${CLIENT_URL}/login" style="display:inline-block; padding:10px 20px; background:#09090B; color:#FFFFFF; text-decoration:none; border-radius:6px; margin-top:12px;">Return to Login</a>
                </div>
            `)
        }

        const decoded = jwt.verify(token, config.JWT_SECRET)
        const user = await userModel.findOne({
            $or: [
                { _id: decoded.id },
                { email: decoded.email }
            ]
        })

        if (!user) {
            return SendStatusCode(res, 404, "User not found")
        }

        if (user.verified) {
            return res.send(`
                <div style="font-family:sans-serif; text-align:center; padding:60px 20px; background:#F4F4F5; color:#18181B; min-height:100vh;">
                    <h2 style="color:#09090B; text-transform:uppercase;">Account Already Verified</h2>
                    <p style="color:#71717A; max-width:400px; margin:16px auto;">Your email credentials are already active in the SNITCH Archive.</p>
                    <a href="${CLIENT_URL}/login" style="display:inline-block; padding:12px 28px; background:#09090B; color:#FFFFFF; font-weight:700; text-decoration:none; text-transform:uppercase; border-radius:6px; margin-top:20px;">
                        Proceed to Login &rarr;
                    </a>
                </div>
            `)
        }

        user.verified = true
        await user.save()

        return res.send(`
            <div style="font-family:sans-serif; text-align:center; padding:60px 20px; background:#F4F4F5; color:#18181B; min-height:100vh;">
                <h2 style="color:#16A34A; text-transform:uppercase;">Email Verified Successfully</h2>
                <p style="color:#71717A; max-width:400px; margin:16px auto;">Your SNITCH account is now authenticated. Enjoy priority drop access and exclusive member privileges.</p>
                <a href="${CLIENT_URL}/login" style="display:inline-block; padding:12px 28px; background:#09090B; color:#FFFFFF; font-weight:700; text-decoration:none; text-transform:uppercase; border-radius:6px; margin-top:20px;">
                    Start Shopping &rarr;
                </a>
            </div>
        `)

    } catch (error) {
        console.error("[Auth] Email verification error:", error.message)
        return res.status(400).send(`
            <div style="font-family:sans-serif; text-align:center; padding:60px 20px; background:#F4F4F5; color:#18181B; min-height:100vh;">
                <h2 style="color:#DC2626; text-transform:uppercase;">Verification Link Expired</h2>
                <p style="color:#71717A; max-width:400px; margin:16px auto;">This security token is invalid or has expired. Please request a new verification email from your account.</p>
                <a href="${CLIENT_URL}/resend-verify-mail" style="display:inline-block; padding:12px 28px; background:#09090B; color:#FFFFFF; font-weight:700; text-decoration:none; text-transform:uppercase; border-radius:6px; margin-top:20px;">
                    Request New Link &rarr;
                </a>
            </div>
        `)
    }
}

/*** Register Controller */
export async function RegisterController(req, res) {
    const { email, fullname, password, contact, isSeller } = req.body
    
    try {
        const validContact = validatedAndFormat(contact)
        if (!validContact) {
            return SendStatusCode(res, 401, "Contact number is Invalid")
        }

        const isExist = await userModel.findOne({
            $or: [
                { email: email },
                { contact: validContact }
            ]
        })

        if (isExist) {
            return SendStatusCode(res, 409, `User ${isExist.email === email ? "email is already registered" : "contact is already registered"}`)
        }

        // Create new user in database
        const user = await userModel.create({
            fullname,
            email,
            password,
            contact: validContact,
            countryCode: validContact.slice(0, 3),
            role: isSeller ? "seller" : "buyer",
            verified: false
        })

        // Generate 24-hour verification token
        const emailVerificationToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                fullname: user.fullname,
                role: user.role
            },
            config.JWT_SECRET,
            { expiresIn: "24h" }
        )

        // Web App Verification Endpoint
        const verificationUrl = `${BASE_URL}/api/auth/verify-email?token=${emailVerificationToken}`

        // Generate Clean Modern Minimalist E-Commerce Welcome HTML Template
        const emailContent = buildRegisterEmail({
            fullname: user.fullname,
            email: user.email,
            verificationUrl,
            token: emailVerificationToken
        })

        // Asynchronous non-blocking dispatch for 1M+ user architecture
        await SendMailDynamicContent({
            email : user.email,
            subject_line:`Welcome to Song.com ${user.fullname}`,
            dynamic_html_content:emailContent.html

             }).catch(err => {
            console.error(`[RegisterController] Welcome email failed to send to ${user.email}:`, err.message)
        })

        // Return token and fast HTTP response to the client
        return await SendTokenResponse(res, user, "User registered successfully")

    } catch (err) {
        console.error("[RegisterController] Error:", err)
        return SendStatusCode(res, 500, `Internal Server Error: ${err.message}`)
    }
}

/*** Login Controller */
export async function LoginController(req, res) {
    const { fullname, email, password } = req.body
    
    try {
        const user = await userModel.findOne({
            $or: [
                { fullname: fullname },
                { email: email }
            ]
        }).select("+password")

        if (!user) {
            return SendStatusCode(res, 404, "User is not found")
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "User entered invalid password"
            })
        }

        return await SendTokenResponse(res, user, "User is logged in successfully")
    } catch (err) {
        return SendStatusCode(res, 400, `Internal Server Error: ${err.message}`)
    }
}

/*** Resend Verification Email Controller */
export async function ResendMailController(req, res) {
    const { email } = req.body

    try {
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return SendStatusCode(res, 404, "User is not found")
        }

        // 1-minute cooldown protection
        if (user.lastVerificationEmailSent) {
            const timeSinceLastEmail = Date.now() - new Date(user.lastVerificationEmailSent).getTime()
            const oneMinute = 60 * 1000
            if (timeSinceLastEmail < oneMinute) {
                return res.status(429).json({
                    success: false,
                    message: "Please wait before requesting another verification email. Try again in a minute.",
                    retry: Math.ceil((oneMinute - timeSinceLastEmail) / 1000)
                })
            }
        }

        // Rate limit: max 5 requests per 24 hours
        if (user.lastVerificationEmailSent) {
            const twentyFourHours = 24 * 60 * 60 * 1000
            const timeSinceFirstEmail = Date.now() - new Date(user.lastVerificationEmailSent).getTime()

            if (timeSinceFirstEmail < twentyFourHours && user.VerificationEmailResendEmailCount >= 5) {
                return res.status(429).json({
                    success: false,
                    message: "You have exceeded the maximum number of verification email requests (5 per 24 hours). Please try again later."
                })
            }
        }

        // Update tracking metrics
        user.lastVerificationEmailSent = new Date()
        user.VerificationEmailResendEmailCount = (user.VerificationEmailResendEmailCount || 0) + 1
        await user.save()

        // Generate fresh verification token
        const emailVerificationToken = jwt.sign(
            {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                contact: user.contact,
                role: user.role
            },
            config.JWT_SECRET,
            { expiresIn: "24h" }
        )

        const verificationUrl = `${BASE_URL}/api/auth/verify-email?token=${emailVerificationToken}`

        // Generate Clean Modern Minimalist Renewal HTML Template
        const emailContent = buildResendEmail({
            fullname: user.fullname,
            email: user.email,
            verificationUrl,
            token: emailVerificationToken
        })

        // Dispatch email asynchronously
        SendMailDynamicContent({
             email: email,
            subject_line: emailContent.subject,
            dynamic_html_content: emailContent.html
        }).catch(err => {
            console.error(`[ResendMailController] Failed to send email to ${email}:`, err.message)
        })

        return SendStatusCode(res, 200, "Resend Mail Successfully")

    } catch (err) {
        console.error("[ResendMailController] Error:", err)
        return SendStatusCode(res, 500, `Internal Server Error: ${err.message}`)
    }
}

/*** Forget Password Mail Controller */
export async function ForgetMailController(req, res) {
    try {
        const { email } = req.body
       

        const user = await userModel.findOne({ email: email })
        if (!user) {
            return SendStatusCode(res, 404, "User is not found")
        }

        // Generate 15-minute secure password reset token
        const passwordResetToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                type: "password_reset"
            },
            config.JWT_SECRET,
            { expiresIn: "15m" }
        )

        const resetUrl = `${CLIENT_URL}/forget-password?token=${passwordResetToken}`

        // Generate Clean Modern Minimalist Password Reset HTML Template
        const emailContent = buildForgetPasswordEmail({
            fullname: user.fullname,
            email: user.email,
            resetUrl
        })

        // Dispatch email
        SendMailDynamicContent({
            to: email,
            subject: emailContent.subject,
            dynamic_html_content: emailContent.html
        }).catch(err => {
            console.error(`[ForgetMailController] Password reset email failed to send to ${email}:`, err.message)
        })

        return await SendTokenResponse(res, user, "Forget Password Mail Sent Successfully")

    } catch (error) {
        console.error("[ForgetMailController] Error:", error)
        return SendStatusCode(res, 500, `Internal Server Error: ${error.message}`)
    }
}

/** 
 * Forget Password
 */
export async function ForgetPasswordController(req,res){
       
        try {    const email=req.user.email
                  const {NewPassword}=req.body
                  const user=await userModel.findOne({
                    email:email
                  })        
                 
                if(!user){
                    return SendStatusCode(res,code,`User is not found`)
                }
                
            const setPassword=await userModel.findOneAndUpdate({email:email},
                {password:await bcrypt.hash(NewPassword,10)},
              {returnDocument:"after"}
            )
        SendTokenResponse(res,user,`Password is reset successfully`)
            
        } catch (error) {
            SendStatusCode(res,500,`Internal Server Error ${error.message}`)
        }
}
/*** Google OAuth Callback Controller */
export async function GoogleCallback(req, res) {
    try {
        const { id, displayName, emails, photos } = req.user
        const email = emails && emails[0] ? emails[0].value : null
        
        if (!email) {
            return res.redirect(`/login?error=email_not_provided`)
        }

        let user = await userModel.findOne({ email: email }).select("+password")

        if (!user) {
            user = await userModel.create({
                email,
                googleId: id,
                fullname: displayName || "Google Member",
                verified: true
            })
        } else if (!user.googleId) {
            user.googleId = id
            user.verified = true
            await user.save()
        }

        const token = jwt.sign(
            { id: user._id },
            config.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const storefrontUrl = user.role === "seller" ? `${CLIENT_URL}/seller/dashboard` : CLIENT_URL

        // Generate Clean Modern Minimalist Google Welcome & Audit HTML Template
        const emailContent = buildGoogleLoginEmail({
            fullname: user.fullname,
            email: user.email,
            storefrontUrl
        })

        // Dispatch email asynchronously
        SendMailDynamicContent({
            email: user.email,
            subject_line: emailContent.subject,
            dynamic_html_content: emailContent.html
        }).catch(err => {
            console.error(`[GoogleCallback] Welcome email failed for ${user.email}:`, err.message)
        })

        if (user.role === "seller") {
            return res.redirect(`${CLIENT_URL}/seller/dashboard`)
        } else {
            return res.redirect(`${CLIENT_URL}/`)
        }

    } catch (err) {
        console.error("[GoogleCallback] Error:", err)
     return res.redirect(`${CLIENT_URL}/login?error=oauth_failed`)
    }
}

/*** Get Me Controller */
export async function GetmeController(req, res) {
    const user = req.user
   

    return res.status(200).json({
        message: "Fetch user is successfully",
        user: {
            id: user._id,
            email: user.email,
            contact: user.contact,
            fullname: user.fullname,
            role: user.role
        }
    })
}

/*** Logout Controller */
export async function LogoutController(req, res) {
    try {
        const token = req.cookies.token
        res.clearCookie("token")

        if (token) {
            await BlackListModel.create({ token: token })
        }

        return res.status(200).json({
            message: "Logout Successfully"
        })
    } catch (err) {
        return SendStatusCode(res, 500, `Logout Error: ${err.message}`)
    }
}
