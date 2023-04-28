# Package names
packages <- c(
  "rmarkdown"
)

# suppressPackageStartupMessages(library(dplyr))
# suppressPackageStartupMessages(library(tictoc))
# suppressPackageStartupMessages(library(purrr))
# suppressPackageStartupMessages(library(jsonlite))
# suppressPackageStartupMessages(library(pracma))

# Install packages not yet installed
installed_packages <- packages %in% rownames(installed.packages())
if (any(installed_packages == FALSE)) {
  install.packages(packages[!installed_packages])
}

# Packages loading
invisible(lapply(
  packages, 
  library, 
  character.only = TRUE, 
  quietly = TRUE)
)


