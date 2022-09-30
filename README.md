
# Testing Solana scripts 

The following dependencies are required to build and run the scripts 
- Install node
- Install npm 
- Install Solana https://docs.solana.com/cli/install-solana-cli-tools 
- Have a Wallet to connect to (e.g. Phantom wallet)

## Solana CLI


### Start local Solana cluster

This example connects to a local Solana cluster by default.

Start a local Solana cluster:
```bash
solana-test-validator
```



## Quick Start


### CLI Keypair 

1. Create new wallet with CLI 
   
```bash
 solana-keygen new 
```

- If you want to create a new one 
```bash
 solana-keygen new --force
```
-  A new keypair will be created
-  The public key will be displayed
-  You can select the file to view the binary array
-  To add new keypair to your wallet import the binary array as your private key

To create additional Key pair
```bash
 solana-keygen new --outfile ~/.config/solana/id2.json
```
- change id2 to whatever file name you prefer. 



### Solana Explorer 

1. Solana explorer + wallet 
- Head to https://explorer.solana.com/ 
- Change cluster from Mainnet Beta to Custom RPC URL 
- Connect your wallet to your local RPC URL as well 


### Running scripts 

1. Install dependencies 

```bash
npm install
```

2. Run build 

```bash
npm run build 
```

3. Run script (for example this will airdrop tokens to )

```bash
node dist/airdrop/index.js runs the javascript file
```

