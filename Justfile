# Load PORT / IMAGE_NAME / etc. from .env if present.
set dotenv-load := true

image_name := env_var_or_default("IMAGE_NAME", "akiidjk-portfolio")
image_tag := env_var_or_default("IMAGE_TAG", "latest")
container_name := env_var_or_default("CONTAINER_NAME", image_name)
port := env_var_or_default("PORT", "3000")

# List all available recipes.
default:
    @just --list

## ---------- bun (aliases of `bun run <script>` / `bun install`) ----------

# Install dependencies.
[group('bun')]
install:
    bun install

# Start the dev server with HMR.
[group('bun')]
dev:
    bun run dev

# Ahead-of-time bundle the server + client into dist/.
[group('bun')]
build:
    bun run build

# Run the production server from source (no Docker).
[group('bun')]
start:
    bun run start

## ---------- docker (local build/run only, no remote deploy) ----------

# Build the production image.
[group('docker')]
docker-build:
    docker build --build-arg PORT={{ port }} -t {{ image_name }}:{{ image_tag }} .

# Run the built image in the foreground, mapped to $PORT.
[group('docker')]
docker-run:
    docker run --rm -p {{ port }}:{{ port }} -e PORT={{ port }} --name {{ container_name }} {{ image_name }}:{{ image_tag }}

# Run the built image detached (background).
[group('docker')]
docker-run-detached:
    docker run -d -p {{ port }}:{{ port }} -e PORT={{ port }} --name {{ container_name }} {{ image_name }}:{{ image_tag }}

# Build then run — the one-shot local shortcut.
[group('docker')]
up: docker-build docker-run

# Stop the detached container, if running.
[group('docker')]
docker-stop:
    docker stop {{ container_name }}

# Tail logs from the detached container.
[group('docker')]
docker-logs:
    docker logs -f {{ container_name }}

# Open a shell in a throwaway container for debugging the image.
[group('docker')]
docker-shell:
    docker run --rm -it --entrypoint sh {{ image_name }}:{{ image_tag }}

# Remove the built image.
[group('docker')]
docker-clean:
    docker rmi {{ image_name }}:{{ image_tag }}
