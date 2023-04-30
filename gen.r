#!/usr/bin/env Rscript
path = getwd()
source(paste(path, "/install.r", sep=""))

rmarkdown::render("gen.rmd",
                  output_file = glue::glue("pdf/binaries_valuation.pdf"))
 

