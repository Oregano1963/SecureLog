

FROM python:3.13-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container. Is this needed?
COPY requirements.txt . 

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire FastAPI application into the container
COPY . .

# Expose the port that the application will run on
EXPOSE 8000

# Command to run the FastAPI application using Uvicorn server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
