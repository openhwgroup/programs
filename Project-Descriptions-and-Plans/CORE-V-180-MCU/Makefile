
pdf:          CORE-V-180-MCU-TWG-20230424.pdf
pdf-1x2:      CORE-V-180-MCU-TWG-20230424-1x2.pdf

show: pdf
	evince CORE-V-180-MCU-TWG-20230424.pdf

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

clean:
	rm -f *.aux *.log *.out *.toc *.nav *.vrb *.snm *.dvi *.ps *.pdf
