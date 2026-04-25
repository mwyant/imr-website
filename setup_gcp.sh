#!/bin/bash

# IMR Infrastructure Setup Script
# Project: imr-web-production

PROJECT_ID="mikewyantjr-dev"
REGION="us-east1"
SERVICE_NAME="imr-landing-page"
SERVICE_ACCOUNT_NAME="imr-deployer"

echo "Initializing infrastructure for $PROJECT_ID..."

# 1. Create Project (Optional - might need to be done via Console if billing isn't linked)
# gcloud projects create $PROJECT_ID --name="IMR Web Production"

# 2. Enable APIs
gcloud services enable run.googleapis.com \
    artifactregistry.googleapis.com \
    cloudbuild.googleapis.com \
    iam.googleapis.com \
    --project $PROJECT_ID

# 3. Create Artifact Registry
gcloud artifacts repositories create imr-repo \
    --repository-format=docker \
    --location=$REGION \
    --description="IMR Website Docker Repository" \
    --project $PROJECT_ID

# 4. Create Service Account for CI/CD
gcloud iam service-accounts create $SERVICE_ACCOUNT_NAME \
    --display-name="IMR CI/CD Deployer" \
    --project $PROJECT_ID

# 5. Assign Roles to Service Account
# Artifact Registry Writer
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/artifactregistry.writer"

# Cloud Run Developer
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.developer"

# Service Account User (needed to act as the runtime service account)
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"

echo "Infrastructure setup complete."
echo "Next: Add the Service Account Key to GitHub Secrets as GCP_SA_KEY."
