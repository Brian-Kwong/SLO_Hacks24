# Gets base image from AWS ECR
FROM public.ecr.aws/lambda/nodejs:20
#installing the dependencies
COPY package*.json ./
RUN npm install
# Copying the source code
COPY . .
ENV PORT 18000

# Default port for the express app
CMD [ "index.handleStart"] 