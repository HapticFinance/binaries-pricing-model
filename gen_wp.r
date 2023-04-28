#!/usr/bin/env Rscript
path = getwd()
source(paste(path, "/install.r", sep=""))

rmarkdown::render("gen_wp.rmd",
                  output_file = glue::glue("pdf/out.pdf"))
 

