# Makefile to assist spell check for SDK proposals

# Copyright (C) 2019 Embecosm Limited
#
# Contributor: Jeremy Bennett <jeremy.bennett@embecosm.com>
#
# This file is part of Embench.

# SPDX-License-Identifier: CC-BY-SA-4.0

# Spell check the documentation

SRC = sdk-project-concept.md

.PHONY: spell
spell: $(SRC) custom.wordlist
	@sed < $(SRC) -e 's/`[^`]\+`//g' -e '/^```/,/^```$$/d' \
	    -e 's/&#[^;]\+;//g' \
	    -e 's/<!-- .\+ -->//g' -e 's/\[.\+\]([^)]*)//g' | \
	    hunspell -p custom.wordlist -l -d en_US | sort -u
