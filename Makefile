.PHONY: help backend frontend install-backend install-frontend test-backend test-frontend

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

backend: ## Start the FastAPI backend server
	uvicorn main:app --reload --host 0.0.0.0 --port 8000

frontend: ## Start the React frontend development server
	cd frontend && npm run dev

install-backend: ## Install Python backend dependencies
	uv sync --extra test

install-frontend: ## Install frontend dependencies
	cd frontend && npm install

install: install-backend install-frontend ## Install all dependencies

test-backend: ## Run backend tests
	uv run pytest tests/ -v

test-frontend: ## Run frontend tests
	cd frontend && npm test -- --run

test: test-backend test-frontend ## Run all tests

build-frontend: ## Build the frontend for production
	cd frontend && npm run build

