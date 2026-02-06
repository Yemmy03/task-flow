# TaskFlow

TaskFlow is a simple three-tier web application designed with cloud-native deployment in mind.

## Architecture Overview

- **Frontend:** React  
- **Backend:** FastAPI  
- **Database:** PostgreSQL  

The application is intended to run locally for development and be deployed to AWS using ECS Fargate behind an Application Load Balancer.

Run frontend:
- npm install
- npm run dev

Next steps:
- CI/CD
- ECS Fargate
- ALB
- Auto scaling
- Observability

## Security Posture

This project follows a defense-in-depth security model aligned with AWS, container, and cloud-native best practices. The focus is on least privilege, strong isolation, and secure defaults.

### Secrets Management

- Credentials are **never hardcoded** in source code or container images.
- Local development uses **environment variables**.
- Production secrets (e.g., database credentials) are stored in **AWS Secrets Manager**.
- ECS tasks retrieve secrets securely at runtime.

### Least Privilege IAM

- ECS **task roles** include only required permissions (e.g., read secrets, write logs).
- ECS **execution roles** are separate from task roles.
- IAM policies are tightly scoped to specific actions and resources.

### Network Segmentation

- Backend services and databases run in **private subnets**.
- Only the **Application Load Balancer (ALB)** is deployed in public subnets.
- **Security groups are tightly scoped**:
  - No `0.0.0.0/0` access to databases.
  - Backend services accept traffic only from the ALB.
  - Database access is restricted to backend services.

### Container Security

- Minimal base images are used:
  - `python:slim`
  - `node:alpine`
- No secrets are baked into container images.
- Container image scanning (e.g., **Trivy**) will be added to CI.

### Transport Security

- All external traffic uses **HTTPS** via ALB and **AWS Certificate Manager (ACM)**.
- Internal service traffic is restricted to the VPC.
- No backend or database endpoints are publicly accessible.

### Application Security

- Input validation is enforced using **FastAPI with Pydantic**.
- Health check endpoints expose **no sensitive data**.
- Error responses avoid leaking internal implementation details.

### Observability and Detection

- **CloudWatch Logs** are enabled for application and infrastructure logging.
- Centralized logs support auditing and incident response.
- **Amazon GuardDuty** will be enabled for threat detection in later phases.

### CI/CD Security

- No secrets are stored in GitHub repositories.
- CI/CD pipelines use **GitHub OIDC** to assume AWS IAM roles.
- No long-lived or static AWS access keys are used.
