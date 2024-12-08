# cloudinary

## Prerequisites
- Node.js (v18 or later)
- npm or yarn
- Git

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/AYANscyy2/uploadToCloudinary
cd upload-to-cloudinary
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

#### Cloudinary Configuration
1. Create a Cloudinary Account
   - Go to [Cloudinary](https://cloudinary.com/)
   - Sign up for a free account
   - Navigate to your Dashboard

2. Retrieve Cloudinary Credentials
   - Cloud Name: Found in the top section of your dashboard
   - API Key: Located in the Account Details section
   - API Secret: Also in the Account Details section
   - Upload Preset: Create this in your Cloudinary Media Library settings

3. Create Environment Files
Create two files in the project root:
- `.env.local` (for development)
- `.env.production` (for production)

Add the following to both files:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<next_public_cloudinary_cloud_name>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<next_public_cloudinary_api_key>
CLOUDINARY_API_SECRET=<cloudinary_api_secret>
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=<upload_preset>
```

4. Create an Environment Sample File
```bash
cp .env.local .env.local.sample
cp .env.production .env.production.sample
```

**Important**: Modify the `.env.sample` files to remove actual credentials, leaving only the key names.

### 4. .gitignore Configuration
Ensure your `.gitignore` includes:
```
# Environment Variables
.env.local
.env.production
```

### 5. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cloudinary Usage Tips
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Used for client-side references
- `NEXT_PUBLIC_CLOUDINARY_API_KEY`: Public API key for client-side operations
- `CLOUDINARY_API_SECRET`: Secure API secret for server-side operations
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`: Preset for upload configurations

### Creating an Upload Preset in Cloudinary
1. Log in to your Cloudinary Console
2. Go to Settings > Upload
3. Scroll to Upload Presets section
4. Click "Add upload preset"
5. Configure your desired upload settings
6. Copy the preset name to use in your `.env` file

## Deployment
1. Set environment variables in your hosting platform
2. Run build command:
```bash
npm run build
# or
yarn build
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting
- Ensure all dependencies are installed
- Check that environment variables are correctly set
- Verify Cloudinary credentials and upload preset

## License
[Your License - e.g., MIT]
