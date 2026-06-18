# SuFyan Abdalkarim - Systems & DevOps Portfolio

A modern, responsive, and interactive static portfolio website tailored for a System & DevOps Engineer. Features a fully custom terminal interface mock-up, system-rack graphics, and a floating particles background.

## 🚀 Features
- **Interactive Console Shell**: Run commands like `neofetch`, `skills`, `about`, `contact` directly inside the custom web terminal.
- **Server Rack Graphic**: CSS-animated LEDs and network cables representing virtualized worker/master nodes.
- **Dynamic Particles Canvas**: Particle connection grids responsive to windows dimensions.
- **DevOps/Cloud badges**: Integrates FontAwesome and Devicon packs.

---

## 🛠️ Local Development

To run the project locally:
```bash
python3 -m http.server 8099
```
Then navigate to `http://localhost:8099` in your web browser.

---

## 📦 Containerization

Build the Docker/Podman container image locally:
```bash
docker build -t portfolio-website .
```

Run the container:
```bash
docker run -d -p 8080:8080 portfolio-website
```
*Note: The container runs on port `8080` using an unprivileged Nginx image, matching OpenShift rootless security compliance.*

---

## 🐙 Push to GitHub

To push this project to your GitHub account:

1. **Create a new blank repository** on GitHub named `portfolio-website` (do not initialize with README or license).
2. **Execute the following commands** in this directory:

```bash
# Initialize git
git init

# Configure local git user info (if not set globally)
git config user.name "SysOpsXpert"
git config user.email "sufyan_60@hotmail.com"

# Stage and commit files
git add .
git commit -m "feat: initial commit of portfolio and pipeline workflow"

# Point to your new GitHub repository
git remote add origin https://github.com/SysOpsXpert/portfolio-website.git
git branch -M main

# Push code to GitHub
git push -u origin main
```

Once pushed, the **GitHub Actions Pipeline** will automatically trigger, build the Docker container image, and host it in your **GitHub Container Registry (GHCR)** at:
`ghcr.io/sysopsxpert/portfolio-website:latest`
