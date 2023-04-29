---
title: "Binary Option Valuation"
output: 
  pdf_document:
      toc: false
      number_sections: false
      toc_depth: 2
      keep_md: true
      keep_tex: true
      template: NULL
      #pandoc_args: [
      #  --template=extras/haptic_template.tex
      #]
html_document: default
tables: yes
geometry: margin=35mm
latex_engine: pdflatex
header-includes:
    - \usepackage{float}
    - \usepackage{pdfpages}
    - \usepackage{tabu}
    - \usepackage{lipsum}
    - \usepackage{booktabs}
    - \usepackage[justification=raggedright,labelfont=bf,singlelinecheck=false]{caption}
    - \usepackage{array}
    - \usepackage{xcolor} 
    - \usepackage{color, colortbl}
    - \usepackage{amsmath}
    - \usepackage{mathtools,mathptmx}
    - \usepackage{bbm}
    - \usepackage{tabularx}
    - \usepackage{background}
    - \usepackage[english]{babel}
    - \usepackage{csquotes}                
    - \usepackage[style=alphabetic, backend=bibtex]{biblatex}
    - \bibliography{bibliography/haptic.bib}
    - \usepackage{tikz}
    - \usepackage[font=small,labelfont=bf]{caption}
    - \usetikzlibrary{shapes,positioning}
    - \usepackage{wrapfig}
    - \usepackage{eso-pic,graphicx,transparent}
    - \DeclareUnicodeCharacter{2212}{-}
    - \backgroundsetup{pages={some},contents={}, opacity={0.3}, color={gray}}
knit: (function(inputFile, encoding) {
  rmarkdown::render(inputFile, encoding = encoding, output_dir = "pdf") })
---

\captionsetup[table]{labelformat=empty}
\captionsetup[table]{labelfont=bf}

\section{Risk-neutral Valuation}

We assume the asset price follows a lognormal random walk in a frictionless, time continuum setting. The expected return equals the risk-free interest rate which is taken to be constant and continuous over time. In addition, the asset does not pay dividends over the life of the option. This  method is called "risk-neutral" valuation approach. 


\subsection{Asset-or-nothing Call}

With this type of option, the payout is one unit of the underlying asset if the spot price $S$ at maturity $T$ ($S_{(T)}$) is above the strike price $K$ or zero otherwise.

\begin{equation*}
V_{AC_{(T)}} = v_{AC}(T, S_{(T)}) = S_{(T)} \Pi_{[S_{(T)} > K]} 
\end{equation*}

Given that the expected return is the risk-free interest rate $r$, we get:

 \begin{flalign}
    V_{AC} = {\rm e}^{-rT} & \underbrace{ \mathbb{E}[S_{(T)}\Pi_{\{S_{(T)} > K\}}]
  }_\text{Partial expectation} \nonumber \\ 
  & \mathbb{E}[S_{(T)}\Pi_{\{S_{(T)} > K\}}] = S{\rm e}^{rT} \Phi(d_{1}) \nonumber \\ 
  \vspace{1cm}
  & \mathnormal{\:\:\:\:\:\:\:\:\:where} \nonumber \\
  & d_{1} = \frac{1}{\sigma\sqrt{T}} \Big [\ln\Big(\frac{S}{K}\Big)+\Big(r + \frac{1}{2} \sigma^2\Big)T \Big] \nonumber \\
  \nonumber \\
  V_{AC} = {\rm e}^{-rT} & S{\rm e}^{rT} \Phi(d_{1}) = S{\rm e}^{-rT} \Phi(d_{1}) \label{eq:1} 
\end{flalign}

Multiplying $\Phi(d_{1})$ by the current asset price and the risk-free compounding factor gives the expected value of receiving the asset at expiration of the option - contingent upon the contract ending up in the money - calculated using risk-adjusted probabilities. Therefore, $\Phi(d_{1})$ is a measure by which the discounted expected value of contingent receipt of the asset exceeds the present value of the asset.

\subsection{Asset-or-nothing Put}
With this type of option, the payout is one unit of the underlying asset if the spot price S at maturity $T$ is below the strike price K or zero otherwise.

\begin{equation*}
    V_{AP_{(T)}} = v_{AP}(T, S_{(T)}) = S_{(T)}\Pi_{\{S_{(T)} < K\}} 
\end{equation*}

\newpage

Using put-call parity, we can derive the value of an asset-or-nothing binary put option ($V_{AP}$) by substituing the value of $V_{AC}$ in the formula for $V_{AP}$:

 \begin{flalign*}
  V_{AP} & = S {\rm e}^{-rT} - V_{AC} \\
  & = S{\rm e}^{-rT}-S{\rm e}^{-rT} \Phi(d_{1}) \\
  & = S{\rm e}^{−rT} (1 − \Phi(d_{1})) \\
  & = S{\rm e}^{-rT} \Phi(-d_{1})
 \end{flalign*}

\subsection{Cash-or-nothing Call}

With this type of option, the payout is one unit of riskless asset if the spot price S at maturity $T$ is above the strike price K or zero otherwise.

\begin{equation*}
    V_{CC_{(T)}} = v_{CC} (T, S_{(T)}) = \Pi_{[S_{(T)}>K]} 
\end{equation*}

Given that the expected return is the risk-free interest rate $r$, we get:

 \begin{flalign}
 V_{CC} & = {\rm e}^{-rT} \mathbb{E}[v_{CC}(T, S_{(T)})] \nonumber \\
 & = {\rm e}^{-rT} \mathbb{E}[\Pi_{[S_{(T)}>K]}] \nonumber \\
    & = {\rm e}^{-rT} \underbrace{\mathbb{P} [S_{(T)}>K]}_\text{Tail probability} \nonumber \\ 
  & \mathbb{P}[S_{(T)} > K] = \Phi(d_{2}) \nonumber \\ 
  & \mathnormal{\:\:\:\:\:\:\:\:\:where} \nonumber \\
  & d_{2} = \frac{1}{\sigma\sqrt{T}}\Big[\ln\Big(\frac{S}{K}\Big) + \Big(r - \frac{1}{2} \sigma^2\Big)T\Big] \nonumber \\
  \nonumber \\
  V_{CC} & = {\rm e}^{-rT} \Phi(d_{2}) \label{eq:2} 
\end{flalign}

The value of a this option equals the risk-free compounding factor multiplied by $\Phi{(d_{2})}$, the risk-adjusted probability that the option will be exercised.

\newpage

\printbibliography
