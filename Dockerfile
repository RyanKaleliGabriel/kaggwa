FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

# # Install system deps
# RUN apt-get update && apt-get install -y \
#     r-base \
#     wget \
#     gdebi-core \
#     libcurl4-openssl-dev \
#     libssl-dev \
#     libxml2-dev \
#     git \
#     libudunits2-dev \ 
#     libgdal-dev \     
#     libgeos-dev \     
#     libproj-dev \     
#     vim \     
#     cmake \     
#     libfontconfig-dev \     
#     libharfbuzz-dev \     
#     libfribidi-dev \     
#     curl \    
#     libmbedtls-dev  \   
#     libnng-dev \     
#     xz-utils \     
#     lbzip2 \     
#     libcloudproviders0 \
#     && rm -rf /var/lib/apt/lists/*


# # Install Quarto
# RUN wget https://github.com/quarto-dev/quarto-cli/releases/download/v1.8.27/quarto-1.8.27-linux-amd64.deb \
#     && dpkg -i quarto-1.8.27-linux-amd64.deb  \
#     && wget https://cran.r-project.org/src/contrib/Archive/leaflet.extras/leaflet.extras_2.0.1.tar.gz \
#     && rm quarto-1.8.27-linux-amd64.deb 

# # Set working directory
# WORKDIR /app

# Copy project filesrm 
COPY . .

# Install R packages from your packages.R
RUN Rscript deployment/packages.R

# Expose preview port
EXPOSE 4200

# Run quarto preview binding to all interfaces
# CMD ["quarto", "preview", "--host", "0.0.0.0", "--port", "4200"]