# Ansible playbooks for developer setup

Ansible playbook collection for configuring and managing Ubuntu desktop.

## Prerequisites

-   These ansible playbooks are intended to be executed on Ubuntu. They have been tested on Ubuntu 20.04.
-   You require to have cloned this repo to your local machine

## Setup

You must install ansible if it is not already installed:

1. Open command prompt and change into the /ansible directory of the repository
1. Execute the following from the command prompt:

```bash
sudo ./scripts/install-ansible.sh
```

3. Enter your password when prompted

## Usage

To run a playbook do the following:

1. Open command prompt and change into the /ansible directory of the repository
2. Execute the following from the command prompt, where 'playbook-name.yml' is the name of the playbook you want to execute:

```bash
ansible-playbook -K playbook-name.yml
```

You can run multiple playbooks:

```bash
ansible-playbook -K setup1.yml setup2.yml
```

You can run every playbook:

```bash
ansible-playbook -K *-setup.yml
```

3. Enter your password when prompted with:

```bash
BECOME password:
```

4. If prompted for any other values then provide them as appropriate

## Playbook manifest

| Playbook | Description                                         | Versions                   |
| -------- | --------------------------------------------------- | -------------------------- |
| setup    | Installs nvm (node version manager) Node.js and npm | v0.39.1 / 14.18.3 / 6.14.5 |

## References

-   [Ansible User Guide](https://docs.ansible.com/ansible/latest/user_guide/index.html)
