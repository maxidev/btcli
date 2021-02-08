<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** maxidev, btcli, twitter_handle, email, BTCli - A Simple Bitcoin command-line explorer, BTCli - A Simple Bitcoin command-line explorer
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h3 align="center">BTCli - A Simple Bitcoin command-line explorer</h3>
  <p align="center">
    <a href="https://github.com/maxidev/btcli/issues">Report Bug</a>
    ·
    <a href="https://github.com/maxidev/btcli/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
      <ul>
        <li><a href="#not-a-wallet">Not a Wallet</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
BTCli aims to be a dev-friendly, simple Bitcoin terminal explorer to easly check for address balance, transaction information, UTXOs and more.
It actually supports Bitcoin Mainnet and Testnet, and different web explorer can be chosen to preset the terminal links.

*BTCli is NOT a wallet!*

See examples below.

### Built With

* [ElectrumX](https://electrumx.readthedocs.io/en/latest/protocol-basics.html)
* [NodeJS](https://nodejs.org)

### Not a Wallet

<!-- GETTING STARTED -->
## Getting Started

To run btcli in your local machine follow these simple steps.

### Prerequisites

  ```sh
  npm install npm@latest -g
  ```

### Installation

   ```sh
   npm install btcli -g
   ```

<!-- USAGE EXAMPLES -->
## Usage

### Commands

- `addr <address>`: Bitcoin Address to check legacy/bech32 supported.
- `block <block>`: Bitcoin block information.
- `tx <transaction>`: Bitcoin transaction.

### Options

- `--verbose`: Output reloaded.
- `--explorer <explorer>`: Web explorer to link.
- `--tojson <filename>`: Output logs in json.
- `--testnet`: Set electrum in testnet chain.

### Examples

```
btcli addr 12pPx8Frg5wTQmprxBLoi8R3mdmFYjmCfv
```

```
btcli block 0
```

```
btcli tx aafe3d76554df980482ec092630ba957dda6458c40178dab54fa44443706808c
```

#### Changing web explorer link

```
btcli tx aafe3d76554df980482ec092630ba957dda6458c40178dab54fa44443706808c -e blockstream
```

```
btcli addr 12pPx8Frg5wTQmprxBLoi8R3mdmFYjmCfv --explorer blockchain-info
```

#### JSON output

```
btcli tx aafe3d76554df980482ec092630ba957dda6458c40178dab54fa44443706808c --tojson [filename]
```

#### In testnet

```
btcli addr tb1qxp7yuclrt65cvawfnpvgg3u8p2nf8qhx7k9jzf --testnet
```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/maxidev/btcli/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Your Name - [@twitter_handle](https://twitter.com/twitter_handle) - email

Project Link: [https://github.com/maxidev/btcli](https://github.com/maxidev/btcli)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* []()
* []()
* []()





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/maxidev/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/maxidev/btcli/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/maxidev/repo.svg?style=for-the-badge
[forks-url]: https://github.com/maxidev/btcli/network/members
[stars-shield]: https://img.shields.io/github/stars/maxidev/repo.svg?style=for-the-badge
[stars-url]: https://github.com/maxidev/btcli/stargazers
[issues-shield]: https://img.shields.io/github/issues/maxidev/repo.svg?style=for-the-badge
[issues-url]: https://github.com/maxidev/btcli/issues
[license-shield]: https://img.shields.io/github/license/maxidev/repo.svg?style=for-the-badge
[license-url]: https://github.com/maxidev/btcli/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/maxidev
