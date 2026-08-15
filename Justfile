# Load PORT / IMAGE_NAME / etc. from .env if present. compose.yaml reads
# the same file directly, so this is the one place those values live.
set dotenv-load

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

# Type-check with tsc, no output emitted.
[group('bun')]
typecheck:
    bun run typecheck

# Format the whole repo in place.
[group('bun')]
format:
    bun run format

# Check formatting without writing — what CI runs.
[group('bun')]
format-check:
    bun run format:check

## ---------- docker compose (local build/run only, no remote deploy) ----------

# Build the production image.
[group('docker')]
docker-build:
    docker compose build

# Run in the foreground, mapped to $PORT.
[group('docker')]
docker-run:
    docker compose up

# Run detached (background).
[group('docker')]
docker-run-detached:
    docker compose up -d

# Build then run detached — the one-shot local shortcut.
[group('docker')]
up:
    docker compose up --build -d

# Stop and remove the container.
[group('docker')]
docker-stop:
    docker compose down

# Tail logs from the running container.
[group('docker')]
docker-logs:
    docker compose logs -f

# Open a shell in a throwaway container for debugging the image.
[group('docker')]
docker-shell:
    docker compose run --rm --entrypoint sh app

# Remove the container and the built image.
[group('docker')]
docker-clean:
    docker compose down --rmi local
