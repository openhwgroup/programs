# OpenSource Development at OpenHW Group
We encourage people to get involved and contribute to OpenHW Group projects.

You can get involved in multiple ways:
- File an issue (either against design artifacts, testbenches or the documentation - we consider errors in all of these to be bugs!).
- Ask a question.
- Generate a pull-request.
- Propose a derivative project.

As with any organization, at the OpenHW Group we have our ways-of-working that help keep entropy under control. Specifically, we use git, GitHub and the Eclipse development process.

### Git/GitHub Development Workflow
Here is a brief description of our development workflow:

1. (Optional) Reach out and open an issue (or grab an open issue) for the feature you want to implement. The issue can be a great way of raising the attention and is also useful to track the implementation of certain features (which can go over multiple pull requests).

2. Fork the repository into your own namespace using GitHub (you only need to do this once!). Configure the upstream remote.

3. Synchronize the remote fork and bring it up to date:
```
$ git fetch --all
$ git checkout main # or "master" (depending on the name of the main branch for that repo)
$ git pull upstream main # or "master"
```
4. Clone your forked repository (xxx is the username you have forked the repository to in step 2.):
```
$ git clone git@github.com:xxxx/core-v-mcu.git
```
5. Create a new branch for the feature/bug you want to implement/fix. Give the branch a meaningful name. You can also prefix it with feature or fix to make the intention more clear. For example if you want to add another CPU core you can name your branch feature/add-new-cpu. The name of the branch isn’t super important so you can also pick more concise names.:
```
$ git checkout -b feature/add-new-cpu
```
6. Git will created the new branch and switch to it. Start development.

7.  Once you are happy with the contribution (or somewhere in between if you think it is worth making a commit), you can add the files to your staging area. For example:
```
$ git add file/i/ve/touched.txt
```
8. Commit the changes and add a meaningful commit message:
```
$ git commit
```
9. Push the changes to your GitHub fork.:
```
$ git push origin feature/add-new-cpu
```
10. Open a pull request using the GitHub interface.

11. Iterate on the pull request interface until all code quality checks are passed and the maintainer is happy with the contribution. You can simply change files and repeat step 7 - 9. Your pull request will automatically be updated and the maintainer notified.

12. The maintainer will merge your changes into the main branch. You can now finish and delete your branch (if you want). For the next feature go back to 3.

## ECA and Signing Commits
We programmatically enforce signing all your commits and check your email against the Eclipse Contributor Agreement database. Be sure to sign-up with the right email address and add it to either the global or local repository setting. For example to add it to the local settings execute the following in the local repository:
```
$ git config user.email "username@example.com"
```
Optionally, you can sign your commits by using _git commit -s_.
