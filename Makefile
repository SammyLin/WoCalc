.PHONY: help install dev build preview clean test lint format deploy cf-dev

# Default target
help:
	@echo "WoCalc - Makefile Commands"
	@echo "=========================="
	@echo ""
	@echo "Development:"
	@echo "  make install      - Install dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make preview      - Preview production build"
	@echo ""
	@echo "Code Quality:"
	@echo "  make test         - Run tests"
	@echo "  make lint         - Run linter"
	@echo "  make format       - Format code"
	@echo ""
	@echo "Deployment:"
	@echo "  make deploy       - Deploy to Cloudflare Pages"
	@echo "  make cf-dev       - Preview Cloudflare Pages locally"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean        - Clean build files"
	@echo ""

# Install dependencies
install:
	@echo "Installing dependencies..."
	pnpm install

# Development server
dev:
	@echo "Starting development server..."
	pnpm dev

# Build for production
build:
	@echo "Building for production..."
	pnpm build

# Preview production build
preview:
	@echo "Starting preview server..."
	pnpm preview

# Run tests
test:
	@echo "Running tests..."
	pnpm test

# Run linter
lint:
	@echo "Running linter..."
	pnpm lint

# Format code
format:
	@echo "Formatting code..."
	pnpm format

# Clean build files
clean:
	@echo "Cleaning build files..."
	rm -rf dist/
	rm -rf .vite/
	rm -rf node_modules/.vite/
	rm -rf .wrangler/
	@echo "Clean complete!"

# Deploy to Cloudflare Pages
deploy:
	@echo "Deploying to Cloudflare Pages..."
	@which wrangler > /dev/null || (echo "Error: Wrangler not found. Install with: pnpm add -D wrangler" && exit 1)
	pnpm deploy

# Preview Cloudflare Pages locally
cf-dev:
	@echo "Starting Cloudflare Pages local preview..."
	@which wrangler > /dev/null || (echo "Error: Wrangler not found. Install with: pnpm add -D wrangler" && exit 1)
	pnpm cf:dev
