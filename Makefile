.PHONY: help install dev build preview clean test lint format deploy deploy-prod status logs

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
	@echo "  make deploy       - Deploy to Vercel (preview)"
	@echo "  make deploy-prod  - Deploy to Vercel (production)"
	@echo "  make status       - Check deployment status"
	@echo "  make logs         - View deployment logs"
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
	@echo "Clean complete!"

# Deploy to Vercel (preview)
deploy:
	@echo "Deploying to Vercel (preview)..."
	@which vercel > /dev/null || (echo "Error: Vercel CLI not found. Install with: pnpm add -g vercel" && exit 1)
	vercel

# Deploy to Vercel (production)
deploy-prod:
	@echo "Deploying to Vercel (production)..."
	@which vercel > /dev/null || (echo "Error: Vercel CLI not found. Install with: pnpm add -g vercel" && exit 1)
	vercel --prod

# Check deployment status
status:
	@echo "Checking deployment status..."
	@which vercel > /dev/null || (echo "Error: Vercel CLI not found. Install with: pnpm add -g vercel" && exit 1)
	vercel ls

# View deployment logs
logs:
	@echo "Viewing deployment logs..."
	@which vercel > /dev/null || (echo "Error: Vercel CLI not found. Install with: pnpm add -g vercel" && exit 1)
	vercel logs
