# Use an official Python runtime as a parent image
FROM python:3.6

# Set the file author (your name - the file's author)
LABEL Author=m4rko

# Define environment variable
ENV PYTHONUNBUFFERED 1

# Create app directory
ENV HOME=/usr/src/app/backend
RUN mkdir -p $HOME && chmod -R 0777 $HOME
# Set the working directory to /app
WORKDIR $HOME

# Copy the current directory contents into the container at /app
COPY . $HOME

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run backend when the container launches
CMD ["python", "manage.py", "runsslserver", "0.0.0.0:8000"]