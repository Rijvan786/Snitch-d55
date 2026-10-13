/**
 * SNITCH E-COMMERCE LUXURY EDITORIAL EMAIL TEMPLATE SUITE
 * Designed for High-Scale Production (1M+ Users)
 * Aesthetics: Noir & Neon Luxury Streetwear Editorial
 * Built with:
 *  - Bulletproof HTML Email Architecture (Tables, role="presentation")
 *  - Inline CSS styles matching Tailwind CSS tokens (#0D0D0D, #141313, #F5F5F0, #F5C518)
 *  - Dark mode optimization & cross-client rendering (Gmail, Apple Mail, Outlook, Yahoo)
 *  - Embedded responsive media queries for flawless mobile rendering
 *  - Preheaders, tracking codes, and accessibility compliance
 */

const BRAND_NAME = "SNITCH";
const BRAND_TAGLINE = "THE UNAPOLOGETIC LUXURY STREETWEAR EDITORIAL";
const BRAND_URL = "http://localhost:5173";
const BRAND_COLOR_GOLD = "#F5C518";
const BRAND_COLOR_BG = "#0D0D0D";
const BRAND_COLOR_CONTAINER = "#141313";
const BRAND_COLOR_CARD = "#1C1B1B";
const BRAND_COLOR_BORDER = "#2B2A2A";
const BRAND_COLOR_TEXT = "#F5F5F0";
const BRAND_COLOR_MUTED = "#8E9192";

/**
 * Base email layout wrapper with cross-client bulletproof structure
 */
function renderEmailLayout({ title, preheader, content }) {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="dark only">
  <meta name="supported-color-schemes" content="dark only">
  <title>${title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    
    :root {
      color-scheme: dark only;
      supported-color-schemes: dark only;
    }
    
    * {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #080808 !important;
      color: #F5F5F0 !important;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
    }

    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }

    td {
      padding: 0;
    }

    img {
      border: 0;
      -ms-interpolation-mode: bicubic;
      max-width: 100%;
      height: auto;
      display: block;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    .cta-button {
      background-color: #F5C518 !important;
      color: #0D0D0D !important;
      font-weight: 800 !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
      transition: all 0.2s ease-in-out;
      display: inline-block !important;
    }

    .cta-button:hover {
      background-color: #ffd65b !important;
      box-shadow: 0 0 20px rgba(245, 197, 24, 0.4) !important;
    }

    @media screen and (max-width: 640px) {
      .email-container {
        width: 100% !important;
        max-width: 100% !important;
      }
      .responsive-padding {
        padding-left: 20px !important;
        padding-right: 20px !important;
      }
      .responsive-header {
        padding: 24px 20px !important;
      }
      .headline-text {
        font-size: 24px !important;
        line-height: 1.2 !important;
      }
      .mobile-stack {
        display: block !important;
        width: 100% !important;
      }
      .product-col {
        display: block !important;
        width: 100% !important;
        margin-bottom: 16px !important;
      }
      .badge-cell {
        display: block !important;
        text-align: left !important;
        margin-top: 10px !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #080808; color: #F5F5F0; font-family: 'Inter', Arial, sans-serif;">
  
  <!-- PREHEADER (Visible in inbox preview snippet, hidden inside email body) -->
  <div style="display: none; max-height: 0px; overflow: hidden; font-size: 1px; line-height: 1px; color: #080808; opacity: 0; mso-hide: all;">
    ${preheader} &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <!-- MAIN EMAIL WRAPPER -->
  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #080808; width: 100%; margin: 0; padding: 30px 10px;">
    <tr>
      <td align="center" style="padding: 0;">
        
        <!-- EMAIL CONTAINER (Max-width 640px) -->
        <table role="presentation" class="email-container" width="640" border="0" cellpadding="0" cellspacing="0" style="width: 640px; max-width: 640px; background-color: #0D0D0D; border: 1px solid #2B2A2A; border-collapse: collapse; overflow: hidden;">
          
          <!-- TOP UTILITY / SYSTEM BAR -->
          <tr>
            <td style="background-color: #050505; border-bottom: 1px solid #242424; padding: 12px 32px;" class="responsive-padding">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="font-size: 11px; font-weight: 700; color: #8E9192; letter-spacing: 0.15em; text-transform: uppercase;">
                    <span style="display: inline-block; width: 6px; height: 6px; background-color: #F5C518; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
                    DISPATCH PROTOCOL // 2026.V
                  </td>
                  <td align="right" class="badge-cell" style="font-size: 11px; font-weight: 600; color: #8E9192; letter-spacing: 0.12em; text-transform: uppercase;">
                    <a href="${BRAND_URL}" target="_blank" style="color: #8E9192; text-decoration: underline;">VIEW ARCHIVE ONLINE</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- EDITORIAL BRAND HEADER -->
          <tr>
            <td style="background-color: #0D0D0D; padding: 36px 36px 28px 36px; border-bottom: 1px solid #2B2A2A;" class="responsive-header">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" valign="middle">
                    <span style="display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.25em; color: #F5C518; text-transform: uppercase; margin-bottom: 6px;">
                      AUTHENTICATED APPAREL ARCHIVE
                    </span>
                    <h1 style="margin: 0; font-size: 38px; font-weight: 900; letter-spacing: -0.04em; color: #F5F5F0; line-height: 1;">
                      ${BRAND_NAME}
                    </h1>
                  </td>
                  <td align="right" valign="bottom" class="badge-cell">
                    <div style="display: inline-block; padding: 6px 12px; border: 1px solid #353434; background-color: #141313; font-size: 10px; font-weight: 700; color: #A1A1AA; letter-spacing: 0.14em; text-transform: uppercase;">
                      TIER: NOIR COLLECTIVE
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- DYNAMIC CONTENT INJECTION -->
          <tr>
            <td style="padding: 0;">
              ${content}
            </td>
          </tr>

          <!-- BRAND VALUE PILLARS / MEMBER PERKS -->
          <tr>
            <td style="background-color: #0A0A0A; border-top: 1px solid #2B2A2A; border-bottom: 1px solid #2B2A2A; padding: 32px 36px;" class="responsive-padding">
              <div style="font-size: 10px; font-weight: 700; color: #F5C518; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 16px;">
                THE NOIR CODE OF PRIVILEGE
              </div>
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td valign="top" class="mobile-stack" style="width: 33.33%; padding: 0 10px 0 0;">
                    <div style="border-left: 2px solid #F5C518; padding-left: 10px; margin-bottom: 12px;">
                      <div style="font-size: 12px; font-weight: 800; color: #F5F5F0; letter-spacing: 0.05em; text-transform: uppercase;">GLOBAL EXPRESS</div>
                      <div style="font-size: 11px; color: #8E9192; line-height: 1.4; margin-top: 4px;">White-glove priority dispatch within 12 hours.</div>
                    </div>
                  </td>
                  <td valign="top" class="mobile-stack" style="width: 33.33%; padding: 0 5px;">
                    <div style="border-left: 2px solid #F5C518; padding-left: 10px; margin-bottom: 12px;">
                      <div style="font-size: 12px; font-weight: 800; color: #F5F5F0; letter-spacing: 0.05em; text-transform: uppercase;">2-HOUR HEADSTART</div>
                      <div style="font-size: 11px; color: #8E9192; line-height: 1.4; margin-top: 4px;">Private passcode portal entry prior to public launch.</div>
                    </div>
                  </td>
                  <td valign="top" class="mobile-stack" style="width: 33.33%; padding: 0 0 0 10px;">
                    <div style="border-left: 2px solid #F5C518; padding-left: 10px; margin-bottom: 12px;">
                      <div style="font-size: 12px; font-weight: 800; color: #F5F5F0; letter-spacing: 0.05em; text-transform: uppercase;">VAULT CONCIERGE</div>
                      <div style="font-size: 11px; color: #8E9192; line-height: 1.4; margin-top: 4px;">Direct WhatsApp liaison for sizing & custom sourcing.</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- EDITORIAL MANIFESTO -->
          <tr>
            <td align="center" style="background-color: #0D0D0D; padding: 36px 36px 32px 36px; border-bottom: 1px solid #2B2A2A;" class="responsive-padding">
              <div style="font-size: 10px; font-weight: 700; color: #8E9192; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 10px;">
                MANIFESTO EXCERPT
              </div>
              <blockquote style="margin: 0; font-size: 18px; font-weight: 800; line-height: 1.4; color: #F5F5F0; letter-spacing: -0.01em; max-width: 480px;">
                "WE DO NOT MASS PRODUCE FOR CONFORMITY. WE ARCHIVE FOR THE DISCERNING."
              </blockquote>
              <div style="font-size: 11px; font-weight: 700; color: #F5C518; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 14px;">
                — ATELIER SNITCH DESIGN LAB
              </div>
            </td>
          </tr>

          <!-- LUXURY EDITORIAL FOOTER -->
          <tr>
            <td style="background-color: #050505; padding: 40px 36px; color: #8E9192;" class="responsive-padding">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" valign="top">
                    <div style="font-size: 20px; font-weight: 900; letter-spacing: -0.02em; color: #F5F5F0; margin-bottom: 4px;">
                      ${BRAND_NAME}
                    </div>
                    <div style="font-size: 10px; font-weight: 600; color: #8E9192; letter-spacing: 0.1em; text-transform: uppercase;">
                      ${BRAND_TAGLINE}
                    </div>
                  </td>
                  <td align="right" valign="top" class="badge-cell">
                    <a href="${BRAND_URL}" target="_blank" style="display: inline-block; padding: 8px 16px; background-color: #141313; border: 1px solid #353434; color: #F5F5F0; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none;">
                      EXPLORE VAULT &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <!-- FOOTER NAVIGATION -->
              <div style="padding-top: 24px; margin-top: 24px; border-top: 1px solid #1E1E1E;">
                <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left" class="mobile-stack" style="font-size: 11px; color: #8E9192; letter-spacing: 0.08em;">
                      &copy; ${new Date().getFullYear()} SNITCH ARCHIVE LTD. ALL RIGHTS RESERVED.
                    </td>
                    <td align="right" class="mobile-stack" style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;">
                      <a href="${BRAND_URL}/privacy" style="color: #8E9192; margin-right: 14px; text-decoration: none;">PRIVACY</a>
                      <a href="${BRAND_URL}/terms" style="color: #8E9192; margin-right: 14px; text-decoration: none;">TERMS</a>
                      <a href="${BRAND_URL}/shipping" style="color: #8E9192; margin-right: 14px; text-decoration: none;">SHIPPING</a>
                      <a href="${BRAND_URL}/contact" style="color: #F5C518; text-decoration: none;">CONCIERGE</a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- REGULATORY & PREFERENCE NOTICE -->
              <div style="font-size: 10px; line-height: 1.6; color: #585858; margin-top: 20px; padding-top: 16px; border-top: 1px solid #141414;">
                You are receiving this encrypted dispatch because your credentials were submitted to the SNITCH Collective. 
                If you believe this transmission was made in error or wish to modify transmission frequency, you may 
                <a href="${BRAND_URL}/account/preferences" style="color: #8E9192; text-decoration: underline;">manage preferences</a> or 
                <a href="${BRAND_URL}/account/unsubscribe" style="color: #8E9192; text-decoration: underline;">unsubscribe</a>.
                <br>
                SNITCH ATELIER • HIGH-STREET ARCHIVE COMPLEX 04 • NEW DELHI / MUMBAI / GLOBAL
              </div>

            </td>
          </tr>

        </table>
        <!-- END EMAIL CONTAINER -->

      </td>
    </tr>
  </table>
  <!-- END MAIN WRAPPER -->

</body>
</html>`;
}

/**
 * 1. REGISTER CONTROLLER EMAIL
 * Welcome to the Collective & Account Verification
 */
export function getRegisterEmail({ fullname, email, verificationUrl, token }) {
  const shortToken = token ? String(token).slice(-8).toUpperCase() : "SNTC-VERIFY";
  const userGreeting = fullname ? fullname.trim() : "Discerning Member";

  const content = `
    <!-- HERO PHOTO / EDITORIAL BANNER -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #141313; border-bottom: 1px solid #2B2A2A;">
      <tr>
        <td style="padding: 0; position: relative;">
          <!-- High-fashion Streetwear Visual -->
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZI1rXQyFUxmTOoLxmPl6QTOArMnc3GK0LeTEJ_YTOsK7J1YfZjqQO8bxoyXAlDED99P-21RI_WHhvf_Oj0NX6cClpZgzvjEgWUbK-MN2OXsD7YhbWIefKQvuiNsn4N_JXVHdMmZwq6jDYIP80j0ktGCd_6oXvFBV_MJDuxomWVvfp317UKpSE_l7XCKwWTLAzzYTfOywBLDZlN6MH_6OcL3RDYSxs2bHMrZ7kYYwHgbkyX6TRm3iIe74E8TcwIx3QYVXeZuZcESU" 
               alt="SNITCH Editorial Streetwear Lookbook" 
               width="640" 
               style="width: 100%; max-width: 640px; height: auto; display: block; filter: brightness(0.95) contrast(1.05);">
        </td>
      </tr>
      <tr>
        <td style="padding: 12px 36px; background-color: #0A0A0A; border-top: 1px solid #242424;" class="responsive-padding">
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="left" style="font-size: 10px; font-weight: 800; color: #F5C518; letter-spacing: 0.18em; text-transform: uppercase;">
                AUTHENTICATED ENTRY // ISSUE 001
              </td>
              <td align="right" style="font-size: 10px; font-weight: 700; color: #8E9192; letter-spacing: 0.12em; text-transform: uppercase;">
                CURATION 2026.IV
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- HERO TEXT STATEMENT -->
    <div style="padding: 40px 36px 32px 36px; background-color: #0D0D0D;" class="responsive-padding">
      <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.22em; color: #F5C518; text-transform: uppercase; margin-bottom: 8px;">
        STATUS: ACCESS GRANTED
      </div>
      <h2 class="headline-text" style="margin: 0 0 16px 0; font-size: 32px; font-weight: 900; line-height: 1.15; letter-spacing: -0.03em; color: #F5F5F0;">
        WELCOME TO THE INNER CIRCLE, ${userGreeting.toUpperCase()}.
      </h2>
      <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.65; color: #C4C7C7;">
        Your identity has been authenticated into the SNITCH Archive. You are no longer an observer—you now inhabit an architectural intersection of high-contrast rebellion, raw silhouettes, and luxury tailoring.
      </p>

      <!-- MEMBER STATS ROW -->
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="border-top: 1px solid #242424; border-bottom: 1px solid #242424; padding: 18px 0; margin-bottom: 32px;">
        <tr>
          <td width="50%" valign="top" style="padding: 10px 0;">
            <div style="font-size: 10px; font-weight: 700; color: #8E9192; letter-spacing: 0.14em; text-transform: uppercase;">ALLOCATION STATUS</div>
            <div style="font-size: 15px; font-weight: 800; color: #F5F5F0; margin-top: 4px;">VIP PROTOCOL // ACTIVE</div>
          </td>
          <td width="50%" valign="top" style="padding: 10px 0; border-left: 1px solid #242424; padding-left: 20px;">
            <div style="font-size: 10px; font-weight: 700; color: #8E9192; letter-spacing: 0.14em; text-transform: uppercase;">ACCOUNT TIED TO</div>
            <div style="font-size: 14px; font-weight: 700; color: #F5C518; margin-top: 4px; word-break: break-all;">${email}</div>
          </td>
        </tr>
      </table>

      <!-- VERIFICATION ACTION CARD -->
      <div style="background-color: #141313; border: 1px solid #353434; padding: 32px; position: relative;">
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="left" style="font-size: 11px; font-weight: 800; color: #F5C518; letter-spacing: 0.18em; text-transform: uppercase;">
              STEP 01 // IDENTITY VALIDATION
            </td>
            <td align="right" style="font-size: 11px; font-weight: 700; color: #8E9192; letter-spacing: 0.1em;">
              EXPIRATION: 24:00 HRS
            </td>
          </tr>
        </table>
        
        <h3 style="margin: 14px 0 8px 0; font-size: 22px; font-weight: 800; color: #F5F5F0; letter-spacing: -0.02em;">
          CONFIRM YOUR MEMBERSHIP
        </h3>
        <p style="margin: 0 0 24px 0; font-size: 13px; line-height: 1.6; color: #A1A1AA;">
          Execute confirmation to activate your priority drop queue, secure private archive checkout, and lock your custom sizing profile.
        </p>

        <!-- SECURITY KEY BOX -->
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #080808; border: 1px solid #242424; padding: 16px; margin-bottom: 24px;">
          <tr>
            <td align="left">
              <span style="font-size: 10px; font-weight: 700; color: #8E9192; letter-spacing: 0.15em; text-transform: uppercase; display: block; margin-bottom: 4px;">
                SINGLE-USE PROTOCOL KEY
              </span>
              <span style="font-size: 24px; font-weight: 900; letter-spacing: 0.2em; color: #F5C518; font-family: monospace;">
                ${shortToken}
              </span>
            </td>
            <td align="right">
              <span style="display: inline-block; padding: 4px 8px; border: 1px solid #353434; font-size: 10px; font-weight: 700; color: #8E9192; letter-spacing: 0.1em; text-transform: uppercase;">
                AES-256 ENCRYPTED
              </span>
            </td>
          </tr>
        </table>

        <!-- PRIMARY CTA BUTTON -->
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="${verificationUrl}" class="cta-button" target="_blank" 
                 style="display: block; width: 100%; text-align: center; padding: 18px 24px; background-color: #F5C518; color: #0D0D0D; font-size: 13px; font-weight: 900; letter-spacing: 0.16em; text-transform: uppercase; text-decoration: none; border-radius: 0;">
                ACTIVATE ACCOUNT CREDENTIALS &rarr;
              </a>
            </td>
          </tr>
        </table>

        <div style="margin-top: 14px; text-align: center; font-size: 11px; color: #707070;">
          Or paste this secure link directly in your browser: <br>
          <a href="${verificationUrl}" target="_blank" style="color: #8E9192; word-break: break-all; text-decoration: underline;">${verificationUrl}</a>
        </div>
      </div>

      <!-- EXCLUSIVE WELCOME GIFT VOUCHER -->
      <div style="margin-top: 32px; background: linear-gradient(135deg, #181717 0%, #111111 100%); border: 1px dashed #F5C518; padding: 24px; text-align: center;">
        <span style="font-size: 10px; font-weight: 800; color: #F5C518; letter-spacing: 0.2em; text-transform: uppercase; display: block; margin-bottom: 6px;">
          NEW MEMBER PRIVILEGE // 10% OFF FIRST ORDER
        </span>
        <div style="font-size: 22px; font-weight: 900; letter-spacing: 0.25em; color: #FFFFFF; font-family: monospace; margin: 8px 0;">
          SNITCH-FIRST10
        </div>
        <p style="margin: 0; font-size: 12px; color: #8E9192;">
          Apply code at checkout. Valid across all archive collections and limited seasonal drops.
        </p>
      </div>

      <!-- CURATED ARCHIVE DROPS PREVIEW -->
      <div style="margin-top: 48px; border-top: 1px solid #2B2A2A; padding-top: 32px;">
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
          <tr>
            <td align="left">
              <span style="font-size: 10px; font-weight: 800; color: #F5C518; letter-spacing: 0.2em; text-transform: uppercase;">ARCHIVE PREVIEW</span>
              <h3 style="margin: 4px 0 0 0; font-size: 20px; font-weight: 900; color: #F5F5F0; letter-spacing: -0.02em;">CURATED FOR YOUR TASTE</h3>
            </td>
            <td align="right">
              <span style="font-size: 10px; font-weight: 700; color: #8E9192; letter-spacing: 0.12em; text-transform: uppercase;">EDITION 001</span>
            </td>
          </tr>
        </table>

        <!-- PRODUCT 1 -->
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #141313; border: 1px solid #2B2A2A; margin-bottom: 16px;">
          <tr>
            <td width="140" valign="top" style="padding: 0;">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgOsrlsfKiAQ6xAXHQZCgjts5xUlUr9II-tH_bbUrjsmsNFYDEjyMBrwnqoVeyMVqOHr7GlZW-8UhzZaavn4Uy8Ws5AqkE2auJPQILSmKyu48rmcNxJ1QxMV3WVctDOlCuO6rW6KMl705HKjWdNVu_rS_91CujXumQgE8mCn_ptmO3nTNiqQlCsaf5UP62jh00QKrmOJnUaSWt1BC_OinGlGkBX9SBeandkl2VeyYjntr3_1K5Uytz658i7JxmJFdcXeeVDyeZoJ8" 
                   alt="Industrial Archive Utility Blazer" width="140" style="width: 140px; height: 140px; object-fit: cover; display: block;">
            </td>
            <td valign="middle" style="padding: 16px 20px;">
              <span style="font-size: 9px; font-weight: 800; color: #F5C518; letter-spacing: 0.15em; text-transform: uppercase;">DROP 01 // ARCHIVE EXCLUSIVE</span>
              <div style="font-size: 15px; font-weight: 800; color: #F5F5F0; margin: 4px 0;">INDUSTRIAL ARCHIVE UTILITY BLAZER</div>
              <div style="font-size: 12px; color: #8E9192; margin-bottom: 8px;">Italian Wool Blend • Tactical Buckle Hardware</div>
              <div style="font-size: 14px; font-weight: 900; color: #F5C518;">&#8377; 14,990</div>
            </td>
          </tr>
        </table>

        <!-- PRODUCT 2 -->
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #141313; border: 1px solid #2B2A2A; margin-bottom: 16px;">
          <tr>
            <td width="140" valign="top" style="padding: 0;">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRbU5NSUaPpXOyi-_-F-EeQdpYezR7uDUZ1mJwGqyaRiISDQDd857T8cR5CoF_kjM1cRxWcd8_jTHqcDPHNAz-w8rjYUJ00rAityBed1VMFRoOyziS5iVmyh0RaKQGQh2SORcBl6eaqw2iQ8Qqqtm0av2vbzHmp2PTSzyuamrizVG8d_1YgHi7OB_5K4VbmtQ6M0qg322nUrJSiSt3lY7XmBcbgqg2o_DV0H2OwN8xTDKneOAzz2UOaFIFawQOCbUOyFtGq_NU72U" 
                   alt="Cybernetic Lug Sole Combat Boot" width="140" style="width: 140px; height: 140px; object-fit: cover; display: block;">
            </td>
            <td valign="middle" style="padding: 16px 20px;">
              <span style="font-size: 9px; font-weight: 800; color: #F5C518; letter-spacing: 0.15em; text-transform: uppercase;">DROP 02 // FOOTWEAR SILHOUETTES</span>
              <div style="font-size: 15px; font-weight: 800; color: #F5F5F0; margin: 4px 0;">CYBERNETIC LUG SOLE COMBAT BOOT</div>
              <div style="font-size: 12px; color: #8E9192; margin-bottom: 8px;">Vibram Rubber Sole • Brushed Gunmetal Hardware</div>
              <div style="font-size: 14px; font-weight: 900; color: #F5C518;">&#8377; 18,500</div>
            </td>
          </tr>
        </table>
      </div>

    </div>
  `;

  return {
    subject: `WELCOME TO THE ARCHIVE // Verify Your SNITCH Membership`,
    text: `WELCOME TO SNITCH // MEMBERSHIP ACTIVATION\n\nHello ${userGreeting},\n\nYour account has been created on SNITCH Archive (${email}).\n\nPlease activate your credentials by clicking the link below:\n${verificationUrl}\n\nYour Single-Use Protocol Key: ${shortToken}\nValidity: 24 Hours\n\nExclusive Welcome Code: SNITCH-FIRST10 (10% off your first archive order)\n\nIf you did not initiate this request, contact security@snitcharchive.com.\n\nSNITCH Archive Team`,
    html: renderEmailLayout({
      title: `WELCOME TO SNITCH // ACTIVATE YOUR ACCOUNT`,
      preheader: `Access Granted. Confirm your identity to unlock exclusive drops and 10% off your first order.`,
      content
    })
  };
}

/**
 * 2. GOOGLE CALLBACK EMAIL
 * Google OAuth Login Notification & Welcome Alert
 */
export function getGoogleLoginEmail({ fullname, email, storefrontUrl = BRAND_URL }) {
  const userGreeting = fullname ? fullname.trim() : "Member";
  const loginTimestamp = new Date().toUTCString();

  const content = `
    <!-- HEADER ALERT BANNER -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #0A0A0A; border-bottom: 1px solid #2B2A2A;">
      <tr>
        <td style="padding: 18px 36px;" class="responsive-padding">
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="left" style="font-size: 11px; font-weight: 800; color: #F5C518; letter-spacing: 0.18em; text-transform: uppercase;">
                SECURITY TRANSMISSION // GOOGLE SINGLE SIGN-ON
              </td>
              <td align="right" style="font-size: 11px; font-weight: 700; color: #10B981; letter-spacing: 0.12em; text-transform: uppercase;">
                &#9679; AUTHENTICATED
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- HERO CONTENT -->
    <div style="padding: 40px 36px 36px 36px; background-color: #0D0D0D;" class="responsive-padding">
      <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.22em; color: #F5C518; text-transform: uppercase; margin-bottom: 8px;">
        ACCESS CONFIRMED
      </div>
      <h2 class="headline-text" style="margin: 0 0 16px 0; font-size: 30px; font-weight: 900; line-height: 1.15; letter-spacing: -0.03em; color: #F5F5F0;">
        GREETINGS, ${userGreeting.toUpperCase()}.
      </h2>
      <p style="margin: 0 0 28px 0; font-size: 15px; line-height: 1.65; color: #C4C7C7;">
        You have successfully accessed the SNITCH Archive via Google Single Sign-On. Your session is active and verified across all editorial gateways.
      </p>

      <!-- AUDIT LOG CARD -->
      <div style="background-color: #141313; border: 1px solid #353434; padding: 28px; margin-bottom: 32px;">
        <div style="font-size: 10px; font-weight: 800; color: #F5C518; letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 16px;">
          AUTHENTICATION AUDIT METRICS
        </div>
        
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #242424; font-size: 12px; color: #8E9192;">AUTHENTICATED ACCOUNT</td>
            <td align="right" style="padding: 8px 0; border-bottom: 1px solid #242424; font-size: 13px; font-weight: 700; color: #F5F5F0;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #242424; font-size: 12px; color: #8E9192;">IDENTITY PROVIDER</td>
            <td align="right" style="padding: 8px 0; border-bottom: 1px solid #242424; font-size: 13px; font-weight: 700; color: #4285F4;">Google OAuth 2.0</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #242424; font-size: 12px; color: #8E9192;">TIMESTAMP (UTC)</td>
            <td align="right" style="padding: 8px 0; border-bottom: 1px solid #242424; font-size: 12px; font-weight: 600; color: #F5F5F0; font-family: monospace;">${loginTimestamp}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 12px; color: #8E9192;">SECURITY ENCRYPTION</td>
            <td align="right" style="padding: 8px 0; font-size: 12px; font-weight: 700; color: #10B981;">TLS 1.3 / Verified Session</td>
          </tr>
        </table>
      </div>

      <!-- PRIMARY ACTION BUTTON -->
      <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <a href="${storefrontUrl}" class="cta-button" target="_blank" 
               style="display: block; width: 100%; text-align: center; padding: 18px 24px; background-color: #F5C518; color: #0D0D0D; font-size: 13px; font-weight: 900; letter-spacing: 0.16em; text-transform: uppercase; text-decoration: none;">
              LAUNCH THE VAULT STOREFRONT &rarr;
            </a>
          </td>
        </tr>
      </table>

      <!-- SECURITY WARNING CALLOUT -->
      <div style="margin-top: 32px; background-color: #0A0A0A; border-left: 3px solid #EF4444; padding: 16px 20px;">
        <div style="font-size: 11px; font-weight: 800; color: #EF4444; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 4px;">
          WAS THIS NOT YOU?
        </div>
        <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #8E9192;">
          If you did not sign in to SNITCH using your Google account at this time, someone may have unauthorized access to your Google account. Please revoke third-party app permissions in your Google Security settings immediately or contact <a href="mailto:security@snitcharchive.com" style="color: #F5C518; text-decoration: underline;">security@snitcharchive.com</a>.
        </p>
      </div>

    </div>
  `;

  return {
    subject: `AUTHENTICATED ACCESS // Welcome to SNITCH via Google`,
    text: `AUTHENTICATED ACCESS // SNITCH\n\nHello ${userGreeting},\n\nYou have securely logged in to SNITCH via Google Single Sign-On.\n\nAccount: ${email}\nTime: ${loginTimestamp}\n\nStart shopping now: ${storefrontUrl}\n\nIf this was not you, please secure your Google account immediately.\n\nSNITCH Archive Team`,
    html: renderEmailLayout({
      title: `SNITCH // GOOGLE AUTHENTICATION CONFIRMED`,
      preheader: `Google sign-in verified. Explore latest drops in the luxury archive.`,
      content
    })
  };
}

/**
 * 3. RESEND MAIL CONTROLLER EMAIL
 * Re-issued Verification Link Dispatch
 */
export function getResendVerificationEmail({ fullname, email, verificationUrl, token }) {
  const shortToken = token ? String(token).slice(-8).toUpperCase() : "SNTC-RENEW";
  const userGreeting = fullname ? fullname.trim() : "Member";

  const content = `
    <!-- HEADER BAR -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #0A0A0A; border-bottom: 1px solid #2B2A2A;">
      <tr>
        <td style="padding: 16px 36px;" class="responsive-padding">
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="left" style="font-size: 11px; font-weight: 800; color: #F5C518; letter-spacing: 0.18em; text-transform: uppercase;">
                PROTOCOL RENEWAL // RE-ISSUED DISPATCH
              </td>
              <td align="right" style="font-size: 11px; font-weight: 700; color: #8E9192; letter-spacing: 0.12em; text-transform: uppercase;">
                CYCLE ACTIVE
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- MAIN BODY -->
    <div style="padding: 40px 36px 36px 36px; background-color: #0D0D0D;" class="responsive-padding">
      <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.22em; color: #F5C518; text-transform: uppercase; margin-bottom: 8px;">
        DISPATCH RETRANSMISSION
      </div>
      <h2 class="headline-text" style="margin: 0 0 16px 0; font-size: 30px; font-weight: 900; line-height: 1.15; letter-spacing: -0.03em; color: #F5F5F0;">
        NEW ACTIVATION KEY GENERATED.
      </h2>
      <p style="margin: 0 0 28px 0; font-size: 15px; line-height: 1.65; color: #C4C7C7;">
        Hello ${userGreeting}, as per your request, a fresh verification token has been issued for <strong style="color: #F5F5F0;">${email}</strong>. Any previous activation keys have been permanently revoked for security compliance.
      </p>

      <!-- CARD BLOCK -->
      <div style="background-color: #141313; border: 1px solid #353434; padding: 32px; margin-bottom: 32px;">
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="left">
              <span style="font-size: 10px; font-weight: 800; color: #F5C518; letter-spacing: 0.18em; text-transform: uppercase; display: block; margin-bottom: 4px;">
                RE-ISSUED PROTOCOL TOKEN
              </span>
              <span style="font-size: 26px; font-weight: 900; letter-spacing: 0.2em; color: #F5C518; font-family: monospace;">
                ${shortToken}
              </span>
            </td>
            <td align="right" valign="top">
              <span style="font-size: 11px; font-weight: 700; color: #EF4444; letter-spacing: 0.1em; text-transform: uppercase; display: block;">
                VALID: 24:00 HRS
              </span>
              <span style="font-size: 10px; color: #8E9192;">Single-Use Key</span>
            </td>
          </tr>
        </table>

        <!-- BUTTON -->
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-top: 28px;">
          <tr>
            <td align="center">
              <a href="${verificationUrl}" class="cta-button" target="_blank" 
                 style="display: block; width: 100%; text-align: center; padding: 18px 24px; background-color: #F5C518; color: #0D0D0D; font-size: 13px; font-weight: 900; letter-spacing: 0.16em; text-transform: uppercase; text-decoration: none;">
                CONFIRM IDENTITY & ACTIVATE &rarr;
              </a>
            </td>
          </tr>
        </table>

        <div style="margin-top: 14px; text-align: center; font-size: 11px; color: #707070;">
          Direct endpoint: <br>
          <a href="${verificationUrl}" target="_blank" style="color: #8E9192; word-break: break-all; text-decoration: underline;">${verificationUrl}</a>
        </div>
      </div>

      <!-- RATE LIMIT INFO -->
      <div style="background-color: #0A0A0A; border: 1px solid #242424; padding: 18px 22px;">
        <div style="font-size: 10px; font-weight: 700; color: #8E9192; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 6px;">
          SECURITY ADVISORY // THROTTLING POLICY
        </div>
        <p style="margin: 0; font-size: 12px; color: #787878; line-height: 1.5;">
          For platform integrity, each account is limited to a maximum of 5 verification dispatches per 24-hour cycle. If you did not initiate this request, you may safely disregard this message.
        </p>
      </div>

    </div>
  `;

  return {
    subject: `PROTOCOL RENEWAL // New SNITCH Verification Key`,
    text: `PROTOCOL RENEWAL // SNITCH\n\nHello ${userGreeting},\n\nA new verification key was generated for your account (${email}).\n\nProtocol Key: ${shortToken}\n\nActivate your membership using the link below:\n${verificationUrl}\n\nValid for 24 Hours. Maximum 5 requests allowed per 24 hours.\n\nSNITCH Archive Team`,
    html: renderEmailLayout({
      title: `SNITCH // NEW ACTIVATION KEY`,
      preheader: `Fresh activation link re-issued for your SNITCH Collective membership.`,
      content
    })
  };
}

/**
 * 4. FORGET PASSWORD EMAIL
 * Password Reset / Recovery Protocol
 */
export function getForgotPasswordEmail({ fullname, email, resetUrl, resetToken }) {
  const userGreeting = fullname ? fullname.trim() : "Member";

  const content = `
    <!-- HEADER SECURITY ALERT -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #120505; border-bottom: 1px solid #451515;">
      <tr>
        <td style="padding: 16px 36px;" class="responsive-padding">
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="left" style="font-size: 11px; font-weight: 800; color: #EF4444; letter-spacing: 0.18em; text-transform: uppercase;">
                &#9888; CRITICAL DISPATCH // PASSWORD RESET INITIATED
              </td>
              <td align="right" style="font-size: 11px; font-weight: 700; color: #EF4444; letter-spacing: 0.12em; text-transform: uppercase;">
                HIGH PRIORITY
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- MAIN BODY -->
    <div style="padding: 40px 36px 36px 36px; background-color: #0D0D0D;" class="responsive-padding">
      <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.22em; color: #EF4444; text-transform: uppercase; margin-bottom: 8px;">
        CREDENTIAL RECOVERY
      </div>
      <h2 class="headline-text" style="margin: 0 0 16px 0; font-size: 30px; font-weight: 900; line-height: 1.15; letter-spacing: -0.03em; color: #F5F5F0;">
        PASSWORD RESET PROTOCOL.
      </h2>
      <p style="margin: 0 0 28px 0; font-size: 15px; line-height: 1.65; color: #C4C7C7;">
        Attention ${userGreeting}, a request was received to reset the security password for your account associated with <strong style="color: #F5F5F0;">${email}</strong>.
      </p>

      <!-- RESET ACTION BOX -->
      <div style="background-color: #141313; border: 1px solid #353434; padding: 32px; margin-bottom: 32px;">
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="left">
              <span style="font-size: 10px; font-weight: 800; color: #F5C518; letter-spacing: 0.18em; text-transform: uppercase; display: block; margin-bottom: 4px;">
                TIME-SENSITIVE SECURITY TOKEN
              </span>
              <span style="font-size: 18px; font-weight: 800; color: #F5F5F0;">
                SECURE CREDENTIAL OVERRIDE
              </span>
            </td>
            <td align="right" valign="top">
              <span style="display: inline-block; padding: 4px 10px; background-color: #260A0A; border: 1px solid #5C1515; font-size: 11px; font-weight: 800; color: #EF4444; letter-spacing: 0.1em; text-transform: uppercase;">
                EXPIRES IN 15 MIN
              </span>
            </td>
          </tr>
        </table>

        <p style="margin: 16px 0 24px 0; font-size: 13px; line-height: 1.6; color: #A1A1AA;">
          Click the button below to specify new credentials for your account. This link can only be executed once.
        </p>

        <!-- CTA BUTTON -->
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <a href="${resetUrl}" class="cta-button" target="_blank" 
                 style="display: block; width: 100%; text-align: center; padding: 18px 24px; background-color: #F5C518; color: #0D0D0D; font-size: 13px; font-weight: 900; letter-spacing: 0.16em; text-transform: uppercase; text-decoration: none;">
                RESET PASSWORD NOW &rarr;
              </a>
            </td>
          </tr>
        </table>

        <div style="margin-top: 14px; text-align: center; font-size: 11px; color: #707070;">
          Direct recovery URL: <br>
          <a href="${resetUrl}" target="_blank" style="color: #8E9192; word-break: break-all; text-decoration: underline;">${resetUrl}</a>
        </div>
      </div>

      <!-- CRITICAL SECURITY WARNING -->
      <div style="background-color: #0A0A0A; border-left: 3px solid #F5C518; padding: 18px 22px;">
        <div style="font-size: 11px; font-weight: 800; color: #F5C518; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 4px;">
          DID NOT REQUEST THIS RESET?
        </div>
        <p style="margin: 0; font-size: 12px; color: #8E9192; line-height: 1.5;">
          If you did not initiate a password reset, no action is required on your part. Your account remains entirely secure and your current password has not been altered. For security concerns, please contact our dispatch team at <a href="mailto:security@snitcharchive.com" style="color: #F5C518; text-decoration: underline;">security@snitcharchive.com</a>.
        </p>
      </div>

    </div>
  `;

  return {
    subject: `SECURITY ALERT // Reset Your SNITCH Password`,
    text: `SECURITY ALERT // SNITCH PASSWORD RESET\n\nHello ${userGreeting},\n\nA request was made to reset the password for your SNITCH account (${email}).\n\nReset your password using the link below:\n${resetUrl}\n\nImportant: This link is valid for 15 minutes only and can be used once.\n\nIf you did not make this request, ignore this email. Your password is unchanged.\n\nSNITCH Archive Team`,
    html: renderEmailLayout({
      title: `SNITCH // PASSWORD RECOVERY PROTOCOL`,
      preheader: `Secure password reset requested. Valid for 15 minutes.`,
      content
    })
  };
}
