
## Design Principles

### Security First

All design decisions must take security as the first priority.

* The agent must allow for manual override to cater for users who prefer not to entrust their system to GX's central control.
* All external binaries must be checksum'd following download and before use.
* The Agent must self-verify itself before execution
* To protect against local root ssl attack. A copy of the API server's public key should be embedded and be tested against from each release of the agent.
* Private keys (including API tokens for external providers), especially those used in trading, must never leave the computer. GX's server should never store user's trading credentials.

### Decentralised Control

* The agent must obey locally set parameters if they conflict with the command from the GX API.
* The agent must report the difference to the GX API, so that the user is aware of it (in case of a local attack).

Example use case 1 - legitimate control:

* GX's system lets user configure pools via the web dashboard and API.
* Some users are afraid that their rigs may switch to the wrong pool if GX gets hacked.
* These users can choose to override the pool configs at the node level, so that their hasing power are always sent to the right place.
* GX's dashboard reports the local changes, the user feels assured.

Example use case 2 - hack detection:

* A mining node is compromised (e.g. via a virus), the attacker changes the local config file to redirect hashing power to their pool.
* The agent reports this back to GX's API.
* GX's dashboard shows this to the user.
* The user investigates their mining device and remove the hack.

### Modular

The agent is structured so that its component can be developed individually, following a plugin-based architecture. We use [Cloud9's Architect](https://github.com/c9/architect) framework for this. This enables enterprise and power users to make integrate with the core agent via custom module.

The agent should be able to run in different "modes", depending on activated plugins:

* Mining Controller
* Trading
* Code signing only
