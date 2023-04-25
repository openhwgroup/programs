
CSS = openhw.css


pdf:           CORE-V-180-MCU-TWG-20230424.pdf
pdf-1x2:       CORE-V-180-MCU-TWG-20230424-1x2.pdf

proposal-html:  Project-proposal-COVE-V-180-MCU.html
proposal-clean: clean-md-Project-proposal-COVE-V-180-MCU

show: pdf
	evince CORE-V-180-MCU-TWG-20230424.pdf


.PRECIOUS: %.rst


# ------------------------------------------------------------------------------
# LaTeX/PDF rules.

pngeps: $(patsubst %.png,%.eps,$(wildcard images/*.png))
figeps: $(patsubst %.fig,%.eps,$(wildcard images/*.fig))
figpdf: $(patsubst %.fig,%.pdf,$(wildcard images/*.fig))

#LATEX_INCLUDES = header.tex definitions.tex

images/%.pdf: images/%.fig; fig2dev -L pdf -p dummy $< $@
images/%.eps: images/%.fig; fig2dev -L eps $< $@
images/%.eps: images/%.png; convert $< $@

%.pdf: %.tex $(LATEX_INCLUDES) figpdf figeps
	lualatex $<	
	lualatex $<	

%-1x2.pdf: %.pdf
	pdfnup --nup 1x2 --suffix 1x2 --no-landscape --batch $<

clean-latex-%:
	rm -f $*.aux $*.log $*.out $*.toc $*.nav $*.vrb $*.snm $*.dvi $*.ps $*.pdf


# ------------------------------------------------------------------------------
# Markdown/reStructuredText rules.

%.rst: %.md
	pandoc $*.md --from markdown --to rst -s -o $*.rst

%.html: %.rst $(CSS)
	rst2html --stylesheet=$(CSS) --link-stylesheet $*.rst > $*.html

%.html: %.rst
	rst2html $*.rst > $*.html

clean-md-%:
	rm -f $*.rst $*.html
