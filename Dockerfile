FROM node:7.5.0

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app

# Install dependencies
WORKDIR /usr/src/app
RUN chmod +x ./run.sh

# Expose the app port
EXPOSE 3001

# Start the app
ENTRYPOINT ["./run.sh"]
