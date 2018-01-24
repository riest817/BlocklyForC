% graduate.cls 31-Jan-99 from graduate1997.sty
% by Yasunori Hanada
% risepaper.cls modified by H. Kitajima on  28 Jan 2002
% eniepaper.cls modified by H. Matsushita on  2 Feb 2016
% $Id: graduate2001.cls,v 1.2 2001/12/29 06:11:40 masatosi Exp $
\typeout{Document Class `香川大学 工学部 電子・情報工学科 論文スタイル'.}

%\NeedsTeXFormat{pLaTeX2e}
\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{eniepaper}[2002/1/28 v1.0 Kitajima.]
\LoadClass[11pt]{jreport}
\newif\ifnoheadfoot
\newif\iftanilabenum
\DeclareOption{no-colon}{
  \long\def\@makecaption#1#2{%
    \vskip\abovecaptionskip
    \iftdir\sbox\@tempboxa{#1\hskip1zw#2}%
      \else\sbox\@tempboxa{#1 #2}%
    \fi
    \ifdim \wd\@tempboxa >\hsize
      \iftdir #1\hskip1zw#2\relax\par
        \else #1 #2\relax\par\fi
    \else
      \global \@minipagefalse
      \hbox to\hsize{\hfil\box\@tempboxa\hfil}%
    \fi
    \vskip\belowcaptionskip}}
\DeclareOption{no-headfoot}{\noheadfoottrue}
\DeclareOption{tanilab-enum}{\tanilabenumtrue}
\ProcessOptions\relax

% 卒論/修論用スタイルファイルの使い方
%
% \documentclass{eniepaper}
% とする。
% 卒論か修論かを選択する．
% \卒論 or \修論
%
% \begin{document}
% 本文
% \end{document}
%
% 本文では以下の項目が使える。
%
% \part{卒論/修論}			% ○ 第 I 部などとなる。
% \chapter{序論}			% ○ 章
% \section{目的}			% ○ セクション
% \subsection{スタイルファイル}		% ○ サブセクション
% \subsubsection{}			%    サブサブセクション
% \paragraph{}				%    パラグラフ
% \subparagraph{}			%    サブパラグラフ
% \acknowledgment			% ○ 謝辞
% \begin{thebibliography}		% ○ 参考文献
% \bibitem
% \end{thebibliography}
% \appendix				% 付録
%  \chapter{付録の章}			% ○ \chapter を続ける
%
% ○のついている項目は目次に現れる。
%
%%% おまけ
%%%
%%% \commentout{コメント}
%%%
%%% とすればコメントアウトできる。
%%%
%%% \ruby{かんじ}{漢字}
%%%
%%% とすればルビがふれる。
%
% 以上
%			花田 泰紀 (yasunori@swlab.csce.kyushu-u.ac.jp)


%%
%% 概要ページ（added by kagawa 2005/2)
%%
\newsavebox{\@etitlebox}
\newsavebox{\@eabstractbox}
\newsavebox{\@jabstractbox}
\newsavebox{\@keywordbox}

\newcommand{\etitle}[1]{%
  \sbox{\@etitlebox}{\noindent {\Large #1} \\[\baselineskip]}}
% 2006/2/7改訂
\def\etitleenv{\lrbox{\@etitlebox}\minipage{\linewidth}\Large}
\def\endetitleenv{\endminipage\endlrbox}

\def\jabstract{\lrbox{\@jabstractbox}\minipage{\linewidth}{\bfseries あらまし\ }}
\def\endjabstract{\endminipage\endlrbox}

\def\eabstract{\lrbox{\@eabstractbox}\minipage{\linewidth}{\bfseries Abstract\ }}
\def\endeabstract{\endminipage\endlrbox}

\def\keyword{\lrbox{\@keywordbox}\minipage{\linewidth}{\bfseries キーワード\ }}
\def\endkeyword{\endminipage\endlrbox}

\def\teacher#1{\gdef\@teacher{#1}}
\gdef\@teacher{}

\def\chief#1{\gdef\@chief{#1}}
\gdef\@chief{}

\def\seconda#1{\gdef\@seconda{#1}}
\gdef\@seconda{}

\def\secondb#1{\gdef\@secondb{#1}}
\gdef\@secondb{}

\def\year#1{\gdef\@year{#1}}
\gdef\@year{}
%%
%% 用紙設定
%%

%\setlength{\hoffset}{-1mm}		% 1mm左にずらす
\newlength{\SIDEMARGIN}			% 左右のマージン
\ifnoheadfoot
\setlength{\SIDEMARGIN}{42mm}
\else
  \setlength{\SIDEMARGIN}{25mm}
\fi
\setlength{\oddsidemargin}{\SIDEMARGIN}
\addtolength{\oddsidemargin}{-1in}
\setlength{\evensidemargin}{\oddsidemargin}
\ifnoheadfoot
  \setlength{\textwidth}{50zw}
\else
  \setlength{\textwidth}{\paperwidth}	% 本文の幅
\fi
\addtolength{\textwidth}{-2\SIDEMARGIN}
\addtolength{\textwidth}{-1mm}		% 微調整

\setlength{\textheight}{650pt}
\setlength{\headsep}{15pt}
\setlength{\topmargin}{0pt}
\setlength{\topskip}{20pt}
\setlength{\footskip}{18pt}

\setlength{\leftmargin}{25mm}	% リスト環境の左マージン
\setlength{\rightmargin}{17mm}	% リスト環境の右マージン

%
% default設定
%

\def\department{\def\@department}
\department{工学研究科}
\def\subdepart{\def\@subdepart}
\subdepart{電子・情報工学専攻}
\def\@acknowledgmentname{謝辞}
\def\@appendixname{付録}

%\def\abstractname{要 旨}
\def\tablename{表 }
\def\figurename{図 }
\def\indexname{索引}
\def\refname{参考文献} 
%\def\listtablename{表一覧}
%\def\listfigurename{図一覧}
\def\contentsname{目次}
\def\@chapapp#1{第 \lower0.1ex\hbox{#1} }
\def\@partapp#1{第 #1 部}

%
% スタイルパラメータ
%
\def\baselinestretch{1.2}

\def\thepart {\Roman{part}}
\def\thechapter {\arabic{chapter}}
\def\thesection {\thechapter.\arabic{section}}
\def\thesubsection {\thesection.\arabic{subsection}}
\def\thesubsubsection {\thesubsection .\arabic{subsubsection}}
\def\theparagraph {\thesubsubsection.\arabic{paragraph}}
\def\thesubparagraph {\theparagraph.\arabic{subparagraph}}

%
% macros for macros
%
\def\baselinechange#1{\def\baselinestretch{#1}\@normalsize}

%
% 表紙/目次
%
\ifnoheadfoot
  \gdef\chaptermark#1{}
  \gdef\@chaptermark#1{}
\else
  \gdef\chaptermark#1{\@chaptermark{\head@chapapp\ \ {#1}}}
  \gdef\@chaptermark#1{\gdef\@thehead{\vbox{\hbox to \textwidth{
    \bf\ {#1}\hfil\thepage\ }
    \hbox{\rule[-2pt]{\textwidth}{1pt}}}}}
\fi
%
% 表紙
%
\newif\if修論
\let\if修論=\iffalse
\def\修論{\let\if修論=\iftrue}

\newif\if卒論
\let\if卒論=\iffalse
\def\卒論{\let\if卒論=\iftrue}

\def\maketitle{
 \begin{titlepage}
  \null
  \vfil
  \begin{center}
   {\huge\bf\@title\par}\vskip 8em minus 2em
	\if修論
	\kanjiskip=.1zw plus 0pt minus 0pt
	\begin{table}[h]
	\renewcommand{\arraystretch}{1.4}
	\centering
  	\begin{tabular}
  	{@{\vrule width 1.8pt\ }c|c|c@{\ \vrule width 1.8pt}}
  	\noalign{\hrule height 1.8pt}
   	\multicolumn{3}{@{\vrule width 1.8pt}c@{\ \vrule width 1.8pt}}{\large \shortstack{{\small }\\ \\ 香\ \ 川\ \ 大\ \ 学\ \ 大\ \ 学\ \ 院\ \ 工\ \ 学\ \ 研\ \ 究\ \ 科\\ \ \ 	博士前期課程信頼性情報システム工学専攻\ \ \\ \\ \\ \textgt{\Large{修　　士　　論　　文}}}}\\
   	\hline
    	\multicolumn{2}{@{\vrule width 1.8pt}c|}{\large 修 了 年 度} & \large\@year \\ \hline
    	\multicolumn{2}{@{\vrule width 1.8pt}c|}{\large 指 導 教 員} & \large \@teacher \\ \hline
   	\large \ 審　査\ & \large 主　査 & \large \@chief \\ \cline{2-3}
   	\large \ 担　当\ & \multirow{2}{*}{\large 副　査}  & \large \@seconda \\ \cline{3-3}
   	\large \ 教　員\ & & \large \@secondb \\ 
 	\noalign{\hrule height 1.8pt}
  	\end{tabular}
	\end{table}
	\kanjiskip=0zw plus 0pt minus 0pt
	\par \vskip 10em
	{\Large\bf 香川大学大学院 工学研究科}\vskip 0em
	{\Large\bf 博士前期課程 信頼性情報システム工学専攻}\vskip 2em minus 3em
	\else 
		\if卒論
			\kanjiskip=.1zw plus 0pt minus 0pt
			\begin{table}[htb]
			\renewcommand{\arraystretch}{1.3}
			\centering
 			\begin{tabular}
  			{@{\vrule width 1.8pt\ }c|c|c@{\ \vrule width 1.8pt}}
  			\noalign{\hrule height 1.8pt}
   			\multicolumn{3}{@{\vrule width 1.8pt}c@{\ \vrule width 1.8pt}}{\large \ 　　香川大学工学部電子・情報工学科　　\ }\\
  			\multicolumn{3}{@{\vrule width 1.8pt}c@{\ \vrule width 1.8pt}}{\bf{\Large{卒　　業　　論　　文}}} \\ \hline
    			\multicolumn{2}{@{\vrule width 1.8pt}c|}{\large \ 卒 業 年 度} & \large \@year \\ \hline
   	 		\multicolumn{2}{@{\vrule width 1.8pt}c|}{\large \ 指 導 教 員} & \large \@teacher \\
 			\noalign{\hrule height 1.8pt}
  			\end{tabular}
			\end{table}
			\kanjiskip=0zw plus 0pt minus 0pt
			\par \vskip 10em
			{\Large\bf 香川大学工学部 電子・情報工学科}
				\vskip 2em
		\fi
	\fi
   {\Large\bf\@author\par}\vskip 2em minus 2em
   {\Large\bf\@date}\vskip 2em minus 2em
  \end{center}
  \vfil
  \newpage
  \thispagestyle{empty}
  \usebox{\@etitlebox}\vskip 2em minus 2em
  
  \usebox{\@eabstractbox}\vskip 2em minus 2em
  \usebox{\@jabstractbox}\vskip 2em minus 2em
  \usebox{\@keywordbox}\vskip 2em minus 2em
  \vfil
  \newpage
  {\pagenumbering{roman}
  \baselinechange{1}
  \tableofcontents}
 %\listoffigures
  \newpage
  \pagenumbering{arabic}
  \pagestyle{myheadings}
  \ifnoheadfoot
    \gdef\@thefoot{}
  \else
    \gdef\@thefoot{\vbox{
     \vspace{18pt}
     \hrule width\textwidth height0.25pt\vskip3pt
	\if修論
		\hbox to\textwidth{\hfill{\footnotesize 
			信頼性情報システム工学専攻}}
	\else 
		\if卒論
			\hbox to\textwidth{\hfill{\footnotesize 
				電子・情報工学科}}
		\fi
	\fi}}
    % \hbox to\textwidth{\hfill{\footnotesize\@department}\hspace{40pt}}
    % \vspace{-2mm}
    %\hbox to\textwidth{\hfill{\footnotesize\@subdepart}\hspace{40pt}}}}
  \fi
  \setcounter{page}{1}
\end{titlepage}}

%
% はじめに/おわりに
%
%\def\preface#1{\clearpage\typeout{#1}
% \thispagestyle{plain}
% \global\@topnum\z@ \@afterindenttrue
% \addcontentsline{toc}{chapter}{#1}
% \@chaptermark{\bf #1}
% \@makeschapterhead{\bf #1}
% \@afterheading}

%\let\conclusion=\preface

%
% 本文
%

%
% 本文:ヘッダ
%
\def\head@chapapp{\@chapapp{\thechapter}\@chappos}

%
% 本文:chapter,section,...
%
\def\chapterfont#1{\gdef\font@c{#1}}
\chapterfont{\huge\bf}
%\sectionfont{\Large\bf}{\large\bf}{\large\bf}

\def\@makechapterhead#1{ \vspace*{50pt} { \parindent 0pt \raggedright 
 \ifnum \c@secnumdepth >\m@ne \font@c \@chapapp{\thechapter}\@chappos\par 
 \vskip 40pt plus 10pt minus 10pt \fi \font@c \bf #1\par 
 \nobreak \vskip 40pt plus 10pt minus 10pt } }

\def\@makeschapterhead#1{ \vspace*{50pt} { \parindent 0pt \raggedright 
 \font@c \bf #1\par 
 \nobreak \vskip 40pt plus 10pt minus 10pt } }

\def\@chapter[#1]#2{%
  \ifnum \c@secnumdepth >\m@ne
    \refstepcounter{chapter}%
    \typeout{\@chapapp\space\thechapter\space\@chappos}%
    \addcontentsline{toc}{chapter}{\protect\numberline{\thechapter}#1}%
  \else
    \addcontentsline{toc}{chapter}{#1}%
  \fi
  \chaptermark{#1}%
  \addtocontents{lof}{\protect\addvspace{10\p@}}%
  \addtocontents{lot}{\protect\addvspace{10\p@}}%
  \@makechapterhead{#2}\@afterheading}

\def\chapter{\clearpage \thispagestyle{plain} \global\@topnum\z@
\@afterindenttrue \secdef\@chapter\@schapter} 

%
% 謝辞
%
\def\acknowledgment{\clearpage\typeout{\@acknowledgmentname}
 \thispagestyle{plain}
 \global\@topnum\z@ \@afterindenttrue
 \addcontentsline{toc}{chapter}{\@acknowledgmentname}
 \refstepcounter{chapter}
 \@chaptermark{\@acknowledgmentname}
 \@makeschapterhead{\@acknowledgmentname}
 \@afterheading}

%
% 参考文献
%

\def\thebibliography#1{\chapter*{\refname\@mkboth
 {\refname}{\refname}}
 \typeout{\refname}\addcontentsline{toc}{chapter}{\refname}
 \@chaptermark{\refname}
 \list
 {[\arabic{enumi}]}{\settowidth\labelwidth{[#1]}\leftmargin\labelwidth
 \advance\leftmargin\labelsep
 \usecounter{enumi}}
 \def\newblock{\hskip .11em plus .33em minus .07em}
 \sloppy\clubpenalty4000\widowpenalty4000
 \sfcode`\.=1000\relax}
\let\endthebibliography=\endlist

\newif\if@restonecol
\def\theindex{\@restonecoltrue\if@twocolumn\@restonecolfalse\fi
\columnseprule \z@
\columnsep 35pt\twocolumn[\@makeschapterhead{\indexname}]
 \@mkboth{\indexname}{\indexname}\thispagestyle{plain}\parindent\z@
 \parskip\z@ plus .3pt\relax\let\item\@idxitem}
\def\@idxitem{\par\hangindent 40pt}
\def\subitem{\par\hangindent 40pt \hspace*{20pt}}
\def\subsubitem{\par\hangindent 40pt \hspace*{30pt}}
\def\endtheindex{\if@restonecol\onecolumn\else\clearpage\fi}
\def\indexspace{\par \vskip 10pt plus 5pt minus 3pt\relax}

\def\footnoterule{\kern-3\p@ 
 \hrule width .4\columnwidth 
 \kern 2.6\p@} 
\@addtoreset{footnote}{chapter} 
\long\def\@makefntext#1{\parindent 1em\noindent 
 \hbox to 1.8em{\hss$^{\@thefnmark}$}#1}

%
% 付録
%
\def\appendix{\par
 \setcounter{chapter}{0}
 \setcounter{section}{0}
 \def\@chapapp{\@appendixname\ \Alph{chapter}}
 \def\postchaptername{}
 \def\head@chapapp{\@appendixname\ \Alph{chapter}}
 \def\thechapter{}
 \def\thesection {\Alph{chapter}.\arabic{section}}
\def\thefigure{\Alph{chapter}.\@arabic\c@figure}
 \def\thetable{\Alph{chapter}.\@arabic\c@table}
 \gdef\@chapter[##1]##2{
  \refstepcounter{chapter}
  \typeout{\@appendixname\space\Alph{chapter}}
  \addcontentsline{toc}{chapter}{\@appendixname\ \Alph{chapter} ##1}
  \chaptermark{##1}
  \addtocontents{lof}{\protect\addvspace{10pt}}
  \addtocontents{lot}{\protect\addvspace{10pt}} \if@twocolumn
  \@topnewpage[\@makechapterhead{##2}] 
  \else \@makechapterhead{##2}
  \@afterheading \fi}
}

%
% 索引
%
\def\insertindex{\clearpage\typeout{\indexname}
 \thispagestyle{plain}
 \global\@topnum\z@ \@afterindenttrue
 \addcontentsline{toc}{chapter}{\indexname}
 \refstepcounter{chapter}
 \@chaptermark{\indexname}
 \@afterheading}

%
% おまけ
%

%\delayedfont\rubyhira=dmjhira5
%\delayedfont\rubykata=dmjkata5
%\def\ruby#1#2{\leavevmode\vbox{\baselineskip\z@skip \lineskip.25ex
% \ialign{##\crcr \let\jhira=\rubyhira \let\jkata=\rubykata
%  \hfill#1\hfill\crcr\hfill#2\hfill\crcr}}}

\def\commentout{\def\@comment}

%
% for NTT-JTeX
%

%\def\@ptsize{2} \@namedef{ds@10pt}{\def\@ptsize{0}}
%\@namedef{ds@11pt}{\def\@ptsize{1}} 
%\def\ds@twoside{\@twosidetrue \@mparswitchtrue} \def\ds@draft{\overfullrule
%5pt} 
%\@options
%\input j-rep1\@ptsize.sty\relax


%%\parsep 1pt plus 2.5pt minus 1pt
%%\itemsep 1pt plus 2.5pt minus 1pt
%%\topsep 1pt plus 2.5pt minus 1pt
\partopsep 3pt plus 2pt minus 2pt

%\jintercharskip 0pt plus 5pt minus 0.2pt

%\def\JTeX{\leavevmode\lower.5ex\hbox{J}\kern-.18em\TeX}
%\def\JLaTeX{\leavevmode\lower.5ex\hbox{\rm J}\kern-.1em\LaTeX}

%

%\def\document{\endgroup
%  \@colht\textheight  \@colroom\textheight \vsize\textheight
%   \columnwidth\textwidth \@clubpenalty\clubpenalty
%   \if@twocolumn \advance\columnwidth -\columnsep 
%      \divide\columnwidth\tw@ \hsize\columnwidth \@firstcolumntrue 
%   \fi
%  \hsize\columnwidth \linewidth\hsize
%  \begingroup\@floatplacement\@dblfloatplacement
%   \makeatletter\let\@writefile\@gobbletwo
%   \@input{\jobname.aux}\endgroup 
%  \if@filesw \immediate\openout\@mainaux=\jobname.aux
%    \immediate\write\@mainaux{\relax}\fi
%  \def\do##1{\let ##1\@notprerr}
%  \@preamblecmds
%  \let\do\noexpand  
%  \@normalsize\everypar{}% changed for ntt-jtex 1.51 1996/6/6 by nom
%  \maketitle\everypar{}
%  }
%

\iftanilabenum
  \def\labelenumi{(\theenumi)} 
  \def\theenumi{\arabic{enumi}} 
  \def\labelenumii{(\theenumii)}
  \def\theenumii{\Alph{enumii}}
  \def\p@enumii{\theenumi}
  \def\labelenumiii{(\theenumiii)}
  \def\theenumiii{\alph{enumiii}}
  \def\p@enumiii{\theenumi(\theenumii)}
  \def\labelenumiv{(\theenumiv)}
  \def\theenumiv{\roman{enumiv}} 
  \def\p@enumiv{\p@enumiii\theenumiii}
\else  
  \def\labelenumi{\theenumi.} 
  \def\theenumi{\arabic{enumi}} 
  \def\labelenumii{(\theenumii)}
  \def\theenumii{\alph{enumii}}
  \def\p@enumii{\theenumi}
  \def\labelenumiii{\theenumiii.}
  \def\theenumiii{\roman{enumiii}}
  \def\p@enumiii{\theenumi(\theenumii)}
  \def\labelenumiv{\theenumiv.}
  \def\theenumiv{\Alph{enumiv}} 
  \def\p@enumiv{\p@enumiii\theenumiii}
\fi

\def\labelitemi{$\bullet$}
\def\labelitemii{\bf --}
\def\labelitemiii{$\ast$}
\def\labelitemiv{$\cdot$}

%\def\verse{\let\\=\@centercr 
% \list{}{\itemsep\z@ \itemindent -1.5em\listparindent \itemindent 
% \rightmargin\leftmargin\advance\leftmargin 1.5em}\item[]}
%\let\endverse\endlist
%\def\quotation{\list{}{\listparindent 1.5em
% \itemindent\listparindent
% \rightmargin\leftmargin\parsep 0pt plus 1pt}\item[]}
%\let\endquotation=\endlist
%\def\quote{\list{}{\rightmargin\leftmargin}\item[]}
%\let\endquote=\endlist

%\def\descriptionlabel#1{\hspace\labelsep \bf #1}
%\def\description{\list{}{\labelwidth\z@ \itemindent-\leftmargin
% \let\makelabel\descriptionlabel}}
%\let\enddescription\endlist
%\newdimen\descriptionmargin
%\descriptionmargin=3em
%

\def\titlepage{\@restonecolfalse\if@twocolumn\@restonecoltrue\onecolumn
 \else \newpage \fi \thispagestyle{empty}\c@page\z@}
\def\endtitlepage{\if@restonecol\twocolumn \else \newpage \fi}

\arraycolsep 5pt \tabcolsep 6pt \arrayrulewidth .4pt \doublerulesep 2pt 
\tabbingsep \labelsep 
\skip\@mpfootins = \skip\footins
\fboxsep = 3pt \fboxrule = .4pt 
%

\def\part{\cleardoublepage \thispagestyle{plain} \if@twocolumn \onecolumn
\@tempswatrue \else \@tempswafalse \fi \hbox{}\vfil \secdef\@part\@spart} 

\def\@part[#1]#2{\ifnum \c@secnumdepth >-2\relax \refstepcounter{part}
\addcontentsline{toc}{part}{\thepart \hspace{1em}#1}\else
\addcontentsline{toc}{part}{#1}\fi \markboth{}{}
\@chaptermark{\@partapp{\thepart}\ #1}
 {\centering \ifnum \c@secnumdepth >-2\relax \LARGE\bf \@partapp{\thepart} \par
\vskip 20pt \fi \LARGE \bf #1\par}\@endpart} 
\def\@endpart{\vfil\newpage \if@twoside \hbox{} \thispagestyle{empty} 
 \newpage 
 \fi \if@tempswa \twocolumn \fi} 
\def\@spart#1{{\centering \LARGE \bf #1\par}\@endpart}
%
\def\@pnumwidth{1.55em}
\def\@tocrmarg {2.55em}
\def\@dotsep{4.5}
\setcounter{tocdepth}{3}

\def\tableofcontents{\@restonecolfalse\if@twocolumn\@restonecoltrue\onecolumn
 \fi\chapter*{\contentsname\@mkboth{\contentsname}{\contentsname}}
 \@starttoc{toc}\if@restonecol\twocolumn\fi}
%\def\tableofcontents{
%	\section*{目 次\markboth{目 次}{目 次}}
%	\@starttoc{toc}
%}
\def\l@chapter#1#2{%
  \ifnum \c@tocdepth >\m@ne
    \addpenalty{-\@highpenalty}%
    \addvspace{1.0em \@plus\p@}%
    \begingroup
      \parindent\z@ \rightskip\@pnumwidth \parfillskip-\rightskip
      \leavevmode\bfseries
      \setlength\@lnumwidth{1.5zw}% set by yasunori, originally 4zw
      \advance\leftskip\@lnumwidth \hskip-\leftskip
      #1\nobreak\hfil\nobreak\hbox to\@pnumwidth{\hss#2}\par
      \penalty\@highpenalty
    \endgroup
  \fi}

\def\l@section{\@dottedtocline{1}{1.5em}{2.3em}}
\def\l@subsection{\@dottedtocline{2}{3.8em}{3.2em}}
\def\l@subsubsection{\@dottedtocline{3}{7.0em}{4.1em}}
\def\l@paragraph{\@dottedtocline{4}{10em}{5em}}
\def\l@subparagraph{\@dottedtocline{5}{12em}{6em}}
%\def\listoffigures{\@restonecolfalse\if@twocolumn\@restonecoltrue\onecolumn
% \fi\chapter*{\listfigurename\@mkboth
% {\listfigurename}{\listfigurename}}\@starttoc{lof}\if@restonecol
% \twocolumn\fi}
%\def\l@figure{\@dottedtocline{1}{1.5em}{2.3em}}
%\def\listoftables{\@restonecolfalse\if@twocolumn\@restonecoltrue\onecolumn
% \fi\chapter*{\listtablename\@mkboth
% {\listtablename}{\listtablename}}\@starttoc{lot}\if@restonecol
% \twocolumn\fi}
%\let\l@table\l@figure

%
%\setcounter{topnumber}{2}
%\def\topfraction{.7}
%\setcounter{bottomnumber}{1}
%\def\bottomfraction{.3}
%\setcounter{totalnumber}{3}
%\def\textfraction{.2}
%\def\floatpagefraction{.5}
%\setcounter{dbltopnumber}{2}
%\def\dbltopfraction{.7}
%\def\dblfloatpagefraction{.5}

%\long\def\@makecaption#1#2{
% \vskip 10pt 
% \setbox\@tempboxa\hbox{#1: #2}
% \ifdim \wd\@tempboxa >\hsize #1: #2\par \else \hbox
%to\hsize{\hfil\box\@tempboxa\hfil} 
% \fi}

%\newcounter{figure}[chapter]
%\def\thefigure{\thechapter.\@arabic\c@figure}
%\def\fps@figure{tbp}
%\def\ftype@figure{1}
%\def\ext@figure{lof}
%\def\fnum@figure{\figurename \thefigure}
%\def\figure{\@float{figure}}
%\let\endfigure\end@float
%\@namedef{figure*}{\@dblfloat{figure}}
%\@namedef{endfigure*}{\end@dblfloat}
%\newcounter{table}[chapter]
%\def\thetable{\thechapter.\@arabic\c@table}
%\def\fps@table{tbp}
%\def\ftype@table{2}
%\def\ext@table{lot}
%\def\fnum@table{\tablename \thetable}
%\def\table{\@float{table}}
%\let\endtable\end@float
%\@namedef{table*}{\@dblfloat{table}}
%\@namedef{endtable*}{\end@dblfloat}
%
%%\input j-titlepage.sty
%
\mark{{}{}} 

\if@twoside \def\ps@headings{\let\@mkboth\markboth
\def\@oddfoot{}\def\@evenfoot{}\def\@evenhead{\rm \thepage\hfil 
\leftmark}\def\@oddhead{\hbox{} \rightmark \hfil
\rm\thepage}\def\chaptermark##1{\markboth {{\ifnum \c@secnumdepth
>\m@ne
 \@chapapp{\thechapter} \ \fi ##1}}{}}\def\sectionmark##1{\markright
{{\ifnum \c@secnumdepth >\z@
 \thesection. \ \fi ##1}}}}
\else \def\ps@headings{\let\@mkboth\markboth
\def\@oddfoot{}\def\@evenfoot{}\def\@oddhead{\hbox {} \rightmark \hfil
\rm\thepage}\def\chaptermark##1{\markright {{\ifnum \c@secnumdepth
>\m@ne
 \@chapapp{\thechapter} \ \fi ##1}}}}
\fi
\def\ps@myheadings{\let\@mkboth\@gobbletwo
\def\@oddhead{\hbox{}\rightmark \hfil
\rm\thepage}\def\@oddfoot{}\def\@evenhead{\rm \thepage\hfil\leftmark\hbox
{}}\def\@evenfoot{}\def\chaptermark##1{}%
\def\sectionmark##1{}\def\subsectionmark##1{}}

%
%\@addtoreset{equation}{chapter} 
%\def\theequation{\thechapter.\arabic{equation}}

%
\ps@plain \pagenumbering{arabic} \onecolumn \if@twoside\else\raggedbottom\fi 

\flushbottom

%\def\bf{\protect\pdg\protect\pbf}

\def\sloppy{\tolerance 5000 \hfuzz .5\p@ \vfuzz .5\p@}

\endinput
