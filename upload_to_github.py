import os
import base64
import requests
import json

LOVABLE_API_KEY = os.environ.get("LOVABLE_API_KEY")
GITHUB_API_KEY = os.environ.get("GITHUB_API_KEY")
REPO_FULL_NAME = "realarunyadav/abos-crm-frontend"
GATEWAY_URL = "https://connector-gateway.lovable.dev/github"

def upload_file(path, content):
    url = f"{GATEWAY_URL}/repos/{REPO_FULL_NAME}/contents/{path}"
    headers = {
        "Authorization": f"Bearer {LOVABLE_API_KEY}",
        "X-Connection-Api-Key": GITHUB_API_KEY,
        "Content-Type": "application/json"
    }
    encoded_content = base64.b64encode(content.encode()).decode()
    data = {
        "message": f"Initial commit: {path}",
        "content": encoded_content,
        "branch": "main"
    }
    response = requests.put(url, headers=headers, json=data)
    if response.status_code in [201, 200]:
        print(f"Successfully uploaded {path}")
    else:
        print(f"Failed to upload {path}: {response.status_code} {response.text}")

# List of critical files for the foundation
files_to_upload = [
    "package.json",
    "tsconfig.json",
    "vite.config.ts",
    "src/main.tsx",
    "src/router.tsx",
    "src/routes/__root.tsx",
    "src/routes/app.tsx",
    "src/routes/index.tsx",
    "src/lib/api/services.ts",
    "src/lib/auth/AuthProvider.tsx",
    "src/core/rbac/roles.config.ts",
    "src/lib/mock/workspace.demo.ts"
]

for file_path in files_to_upload:
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            upload_file(file_path, f.read())
