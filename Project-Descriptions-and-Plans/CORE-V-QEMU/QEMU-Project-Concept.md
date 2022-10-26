# **OpenHW Project Concept Proposal: CORE-V QEMU**

## **Summary of project**



The CORE-V QEMU project aims to maintain an implementation of QEMU for CORE-V family of cores and devices. [Wikipedia](https://en.wikipedia.org/wiki/QEMU) provides a good description of QEMU. It’s mainly licensed under the[ GNU General Public License](https://en.wikipedia.org/wiki/GNU_General_Public_License) (GPL for short). Various parts are released under the[ BSD license](https://en.wikipedia.org/wiki/BSD_license),[ GNU Lesser General Public License](https://en.wikipedia.org/wiki/GNU_Lesser_General_Public_License) (LGPL) or other GPL-compatible licenses.



This Concept Proposal focuses on the first version of QEMU for the CORE-V MCU SOC design based on CV32E40P core. We’ll also add support for standard extensions which may be used in other CORE-V family of cores.

## **Components**



The work is composed in three parts:

Component 1: support for ISA extensions

Support for ISA extensions is the most important part of simulation for CORE-V family of cores. Most of standard extensions have been supported in the upstream. So this part of work is to add support for custom extension (XPULP extension) and non-supported standard extensions (Zc* extension).

Component 2: support for CV32E40P core

This part of work is to add the cpu type support for CV32E40P, and add support for custom CSRs or other custom feathers if necessary. 

Component 3: support for CORE-V MCU SOC and devices

This part of work is to add CORE-V MCU machine support which also should add support for devices in CORE-V MCU SOC, such as timer, adv timer, event generator, udma (ctrl, uart, spi, i2c, sdio), gpio, i2c slave …

## **Why Open Hardware Group should do this project**

The QEMU is a useful tool for the CORE-V SW project. It can provide both user mode emulation and system emulation to help software developers without real hardware at hand to contribute to OpenHW SW projects.



### **Summary of Timeline**

We identify the following stages:

1. (Component 1) XPULP extension support
2. (Component 1) Zc* extension support
3. (Component 2) CV32E40P core support
4. (Component 3) CORE-V MCU SOC support with timer, adv timer, event generator, udma (ctrl, uart, spi, i2c, sdio), gpio, i2c slave devices

Most development work has been done currently. So All of them can be done in 2~4 month.

## **OpenHW Members/Participants committed to participate**

- PLCT: Project leadership

## **Project manager (PM)**

- Weiwei Li, PLCT Lab

## **Technical project leader(s) (TPLs)**

- None

## **Project documents**

- None

## **Summary of requirements**

Key requirements are:

1. support for XPULP and Zc* extension
2. support for CV32E40P core
3. support for CORE-V MCU SOC

## **Industry landscape: description of competing, alternative, or related efforts in the industry**

QEMU is a free and open-source emulator for many architectures and hardware platforms. What we need do is to add support for CORE-V family of cores and devices to it just like support for other RISC-V product, such as:

- SiFive Freedom E
- SiFive Freedom U

## **External dependencies**

None

## **List of project outputs**

## **Other task groups impacted and associated resource requirements**

CORE-V QEMU can provide test platform for following Software Task Group projects:

- GNU tools
- FreeRTOS
- …

## **Engineering Resource**

### **OpenHW engineering staff resource plan: requirement and availability**

None

**Engineering resource supplied by members - requirement and availability**.

- Component 1 - support for ISA extensions

- - specification of the extensions
  - tests cases for xpulp and Zc* instructions

- Component 2 - : support for CV32E40P core

- - specification of CV32E40P

- Component 3 - support for CORE-V MCU SOC and devices

- - specification of devices
  - test cases for devices

## **Architecture diagram**

The architecture was shown in the introduction to the[ ](https://github.com/openhwgroup/core-v-docs/blob/master/program/Project-Descriptions-and-Plans/SDK/sdk-project-concept.md#components)Components section above.

## **Who would make use of OpenHW output**

Everyone who wants to develop software for CORE-V family of cores and devices may use CORE-V QEMU as a test platform, especially the ones without real hardware at hand.

## **Project license model**

QEMU is mainly licensed under the[ GNU General Public License](https://en.wikipedia.org/wiki/GNU_General_Public_License) (GPL for short). Various parts are released under the[ BSD license](https://en.wikipedia.org/wiki/BSD_license),[ GNU Lesser General Public License](https://en.wikipedia.org/wiki/GNU_Lesser_General_Public_License) (LGPL) or other GPL-compatible licenses.

## **Description of initial code contribution, if required**

None.

## **Repository Structure**

We shall need a core-v-qemu repository for code.