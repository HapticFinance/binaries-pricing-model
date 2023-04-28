# Binary Option Valuation

We assume the asset price follows a lognormal random walk in a frictionless, time continuum setting. In addition, the expected return equals the risk-free interest rate which is taken to be constant and continuous and with no dividend payments over the life of the option. This  method is called "risk-neutral" valuation approach. 

## Asset-or-nothing Call

With this type of option, the payout is one unit of the underlying asset if the spot price $S$ at maturity surpasses the strike price $K$ or zero if it stays below.

$V_{AC_{(T)}} = v_{AC}(T, S_{(T)}) = S_{(T)} \Pi_{[S_{(T)} > K]}$

Given that the expected return is the risk-free interest rate $r$ we get:

\begin{gather*}

  V_{(AC)} = {\rm e}^{-rT} 
    \underbrace{ \rm{E}[S_{(T)}\Pi_{\{S_{(T)} > K\}}]
}_\text{Partial expectation} \\ 

\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\rm{E}[S_{(T)}\Pi_{\{S_{(T)} > K\}}] = \\


\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:S{\rm e}^{(r)T} \Phi(d_{1}) \\

\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\text{where} \\

\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:d_{1} = \frac{1}{\sigma\sqrt{T}}[\ln(\frac{S}{K})+(r+\frac{1}{2}\sigma^2)T]
\vspace{0.5mm} \\

V_{(AC)}= {\rm e}^{-rT} S {\rm e}^{rT} \Phi(d_{1}) \\

\:\:\:\:\:\:\:\:\:\:\:\:\:\:=\:S{\rm e}^{-rT}\Phi(d_{1})

\end{gather*}

\subsection{Asset-or-nothing Put}
With this type of option, the payout is one unit of the underlying asset if the
spot price S at maturity surpasses the strike price K or zero if it stays below.

\begin{equation*}
    V_{AP_{(T)}} = v_{AP}(T, S_{(T)}) = S_{(T)}\Pi_{\{S_{(T)} < K\}} 
\end{equation*}


By put-call parity,

$V_{AP} = S {\rm e}^{-rT} - V_{AC}$ 


\Rightarrow

\vspace{3mm}

$V_{AP} = S{\rm e}^{-rT}-S{\rm e}^{-rT}} \Phi(d_{1})$ \\

\:\:\:\:\:\:\:\:\:\:= S{\rm e}^{-rT} \Phi(-d_{1})

\subsection{Cash-or-nothing Call}
With this type of option, the payout is one unit of the riskless asset if the
spot price S at maturity surpasses the strike price K or zero if it stays below.

\vspace{5mm} \\
$V_{CC_{(T)}} = v_{CC} (T, S_{(T)}) = \Pi_{[S_{(T)}>K]} $

\vspace{5mm} \\

The risk-neutral price:
\begin{gather*}

V_{CC_{(0)}} = {\rm e}^{-rT} \mathcal{E}[v_{CC}(T, S_{(T)})] \\ 

\:\:\:\:\:\:\:\:\:\:\:\:\: = {\rm e}^{-rT} \mathcal{E}[\Pi_{[S_{(T)}>K]}]\\

\:\:\:\:\:\:\:\:\:\:\:\:\: = {\rm e}^{-rT} \underbrace{\mathcal{P} [S_{(T)}>K]}_\text{Tail probability} \\

\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\: \mathcal{P}[S_{(T)} > K] = \Phi(d_{2})
\vspace{3mm} \\
\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\text{where}

\vspace{3mm} \\

d_{2} = \frac{1}{\sigma\sqrt{T}}[\ln(\frac{S}{K}) + (r - \delta - \frac{1}{2} \sigma^2)T]

\end{gather*}

\subsection{Cash-or-nothing Put}

$V_{CP_{(T)}} = v_{CP}(T, S_{(T)}) = \Pi_{\{S_{(T)} < K\}} $

\vspace{3mm}

\text{Since:} \:V_{CP_{(0)}}+ V_{CC_{(0)}} = {\rm e}^{-rT}

\vspace{3mm}

\:\:\:\:\:\:\:\: \Rightarrow V_{CP_{(0)}}} = {\rm e}^{-rT}(1 -\Phi(d_{2})) \\

\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\:\: = {\rm e}^{-rT}\Phi(-d_{2})

\vspace{3mm}

