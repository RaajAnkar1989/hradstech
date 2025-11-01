# SSL Certificate Fix Guide for hradstech.co.uk

## 🔴 Problem Identified

**Error**: `ERR_SSL_PROTOCOL_ERROR`  
**Cause**: SSL/TLS certificate not properly configured on Netlify  
**Status**: HTTP works (redirects to HTTPS), but HTTPS fails

---

## ✅ Solutions (Choose Based on Your Setup)

### Solution 1: Fix SSL Certificate in Netlify Dashboard (Recommended)

#### Step 1: Log into Netlify Dashboard
1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Log in with your Netlify account
3. Find your site `hradstech.co.uk`

#### Step 2: Check Domain Settings
1. Click on your site
2. Go to **Site settings** → **Domain management**
3. Verify that `hradstech.co.uk` is listed as a custom domain

#### Step 3: Provision/Reprovision SSL Certificate
1. In **Domain management**, click on `hradstech.co.uk`
2. Under **SSL/TLS certificate**, click **"Provision certificate"** or **"Renew certificate"**
3. Wait for Netlify to issue the certificate (usually 5-10 minutes)
4. Check if certificate status shows **"Active"** or **"Certificate issued"**

#### Step 4: Force Certificate Renewal (If Still Not Working)
1. In **Domain management** → **SSL/TLS certificate**
2. Click **"Renew certificate"** or **"Delete certificate"** then **"Provision certificate"**
3. Wait for provisioning to complete

---

### Solution 2: Verify DNS Settings

#### Check DNS Configuration
1. In Netlify Dashboard → **Site settings** → **Domain management**
2. Click on `hradstech.co.uk`
3. Verify DNS records match Netlify's requirements:

**Required DNS Records:**
- **A Record**: `@` → Netlify IP (check Netlify dashboard)
- **CNAME Record**: `www` → `hradstech.co.uk` (or Netlify's recommended value)

#### How to Check DNS:
```bash
# Check DNS records
dig hradstech.co.uk
dig www.hradstech.co.uk
```

**Common Issues:**
- DNS not pointing to Netlify
- DNS propagation not complete (wait 24-48 hours)
- Incorrect DNS record type

---

### Solution 3: Manual Certificate Setup via Netlify CLI

#### Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Login and Link Site
```bash
netlify login
netlify link
```

#### Force Certificate Provision
```bash
netlify sites:list
netlify certs:provision --domain hradstech.co.uk
```

---

### Solution 4: Use Let's Encrypt Certificate (Alternative)

If Netlify's automatic certificate doesn't work:

1. **Option A: External Certificate**
   - Get a free SSL certificate from [Let's Encrypt](https://letsencrypt.org/)
   - Upload certificate in Netlify → **Domain management** → **SSL/TLS** → **Add certificate**

2. **Option B: Change Hosting Provider**
   - Consider providers with easier SSL setup:
     - **Vercel**: Automatic SSL
     - **Cloudflare Pages**: Automatic SSL
     - **GitHub Pages**: Free SSL with custom domain

---

### Solution 5: Check Netlify Status

1. Visit [Netlify Status Page](https://www.netlifystatus.com/)
2. Check if there are any ongoing SSL/certificate issues
3. Check Netlify's service health

---

## 🔧 Quick Fixes to Try

### Fix 1: Clear Browser Cache
- Clear browser cache and cookies
- Try incognito/private mode
- Try different browser

### Fix 2: Check Certificate Status
Visit: [https://www.ssllabs.com/ssltest/analyze.html?d=hradstech.co.uk](https://www.ssllabs.com/ssltest/analyze.html?d=hradstech.co.uk)

### Fix 3: Verify Netlify Site Configuration
```bash
# Check if site is properly configured
curl -I http://hradstech.co.uk
# Should return 301 redirect to HTTPS
```

---

## 📋 Common Netlify SSL Issues & Solutions

### Issue 1: Certificate Not Provisioned
**Solution**: Manually provision in Netlify dashboard

### Issue 2: DNS Not Verified
**Solution**: Wait 24-48 hours for DNS propagation

### Issue 3: Domain Not Added to Netlify
**Solution**: Add domain in Netlify dashboard

### Issue 4: Certificate Expired
**Solution**: Renew certificate in Netlify dashboard

### Issue 5: Mixed Content Issues
**Solution**: Ensure all resources use HTTPS

---

## 🚀 Step-by-Step Fix (Recommended)

### Step 1: Access Netlify Dashboard
1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Login to your account

### Step 2: Select Your Site
1. Click on site **hradstech.co.uk** (or find it in your sites list)

### Step 3: Go to Domain Settings
1. Click **Site settings**
2. Click **Domain management** in left sidebar
3. Find **hradstech.co.uk** in the list

### Step 4: Provision SSL Certificate
1. Click on **hradstech.co.uk**
2. Look for **SSL/TLS certificate** section
3. Click **"Provision certificate"** or **"Renew certificate"**
4. Wait for provisioning (status will update)

### Step 5: Verify Certificate
1. Check certificate status shows **"Active"** or **"Certificate issued"**
2. Wait a few minutes for propagation
3. Try accessing https://hradstech.co.uk

### Step 6: Test the Site
1. Visit https://hradstech.co.uk in browser
2. Check browser security icon (should show lock icon)
3. Verify site loads correctly

---

## 🔍 Diagnostic Commands

### Check SSL Certificate
```bash
# Check certificate details
openssl s_client -connect hradstech.co.uk:443 -servername hradstech.co.uk

# Check certificate expiry
echo | openssl s_client -connect hradstech.co.uk:443 -servername hradstech.co.uk 2>/dev/null | openssl x509 -noout -dates
```

### Check DNS Records
```bash
# Check A record
dig +short hradstech.co.uk

# Check all records
dig hradstech.co.uk ANY
```

### Test HTTPS Connection
```bash
# Test HTTPS connection
curl -vI https://hradstech.co.uk 2>&1 | grep -i ssl
```

---

## ⚠️ Important Notes

1. **DNS Propagation**: After DNS changes, wait 24-48 hours for full propagation
2. **Certificate Provisioning**: Netlify SSL certificates usually provision within 5-10 minutes
3. **HTTPS Redirect**: Netlify automatically redirects HTTP to HTTPS (already working)
4. **Free SSL**: Netlify provides free SSL certificates (Let's Encrypt)
5. **Automatic Renewal**: Netlify automatically renews certificates before expiry

---

## 🆘 If Still Not Working

### Contact Netlify Support
1. Go to [Netlify Support](https://www.netlify.com/support/)
2. Create a support ticket
3. Include:
   - Domain name: `hradstech.co.uk`
   - Error message: `ERR_SSL_PROTOCOL_ERROR`
   - Screenshot of SSL certificate status in dashboard

### Alternative: Use Different Hosting
If Netlify continues to have issues:

1. **Vercel**: Free SSL with easy setup
2. **Cloudflare Pages**: Free SSL with custom domain
3. **GitHub Pages**: Free hosting with SSL

---

## ✅ Expected Result

After fixing:
- ✅ https://hradstech.co.uk should load without errors
- ✅ Browser shows lock icon (secure connection)
- ✅ No SSL warnings in browser
- ✅ Site loads correctly

---

## 📝 Checklist

- [ ] Logged into Netlify Dashboard
- [ ] Found site in dashboard
- [ ] Checked Domain management settings
- [ ] Provisioned/renewed SSL certificate
- [ ] Verified certificate status is "Active"
- [ ] Waited for certificate provisioning (5-10 min)
- [ ] Tested https://hradstech.co.uk
- [ ] Verified site loads correctly
- [ ] Checked browser shows secure connection

---

**Last Updated**: Current Date  
**Issue**: ERR_SSL_PROTOCOL_ERROR  
**Platform**: Netlify  
**Status**: SSL Certificate Configuration Issue

