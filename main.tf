provider "google" {
  project = "mikewyantjr-dev"
  region  = "us-east1"
}

resource "google_project_service" "services" {
  for_each = toset([
    "run.googleapis.com",
    "artifactregistry.googleapis.com",
    "cloudbuild.googleapis.com",
    "iam.googleapis.com"
  ])
  service = each.key
  disable_on_destroy = false
}

resource "google_artifact_registry_repository" "imr_repo" {
  location      = "us-east1"
  repository_id = "imr-repo"
  description   = "IMR Website Docker Repository"
  format        = "DOCKER"
  depends_on    = [google_project_service.services]
}

resource "google_cloud_run_v2_service" "imr_landing" {
  name     = "imr-landing-page"
  location = "us-east1"
  ingress  = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "us-east1-docker.pkg.dev/imr-web-production/imr-repo/imr-website:latest"
      ports {
        container_port = 8080
      }
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}

# Allow unauthenticated access
resource "google_cloud_run_v2_service_iam_member" "public_access" {
  location = google_cloud_run_v2_service.imr_landing.location
  name     = google_cloud_run_v2_service.imr_landing.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
