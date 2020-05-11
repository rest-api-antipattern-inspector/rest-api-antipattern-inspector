// https://dev.bitly.com/v4_documentation.html
import { GET, POST, PATCH, PUT, DELETE } from '../../utils/HTTPMethods'
import { username, org, repo, issue_number, pull_number } from './constants'
import randomWords from 'random-words'

export const endpoints = [
  {
    url: 'user/repos',
    method: GET,
  },
  {
    url: `users/${username}/repos`,
    method: GET,
    endpoint: 'users/{username}/repos',
  },
  {
    url: `orgs/${org}/repos`,
    method: GET,
    endpoint: 'orgs/{org}/repos',
  },
  {
    url: 'repositories',
    method: GET,
  },
  {
    url: `repos/${username}/${repo}`,
    method: PATCH,
    endpoint: 'repos/{owner}/{repo}',
    data: { description: randomWords() },
  },
  {
    url: `repos/${username}/${repo}/topics`,
    method: GET,
    endpoint: 'repos/{owner}/{repo}/topics',
    acceptHeader: 'application/vnd.github.mercy-preview+json',
  },
  {
    url: `repos/${username}/${repo}/topics`,
    method: PUT,
    endpoint: 'repos/{owner}/{repo}/topics',
    data: { names: [randomWords(), randomWords()] },
    acceptHeader: 'application/vnd.github.mercy-preview+json',
  },
  {
    url: `repos/${username}/${repo}/vulnerability-alerts`,
    method: PUT,
    endpoint: 'repos/{owner}/{repo}/vulnerability-alerts',
    acceptHeader: 'application/vnd.github.dorian-preview+json',
  },
  {
    url: `repos/${username}/${repo}/vulnerability-alerts`,
    method: DELETE,
    endpoint: 'repos/{owner}/{repo}/vulnerability-alerts',
    acceptHeader: 'application/vnd.github.dorian-preview+json',
  },
  {
    url: `repos/${username}/${repo}/contributors`,
    method: GET,
    endpoint: 'repos/{owner}/{repo}/contributors',
  },
  {
    url: `repos/${username}/${repo}/languages`,
    method: GET,
    endpoint: 'repos/{owner}/{repo}/languages',
  },
  {
    url: `repos/${username}/${repo}/tags`,
    method: GET,
    endpoint: 'repos/{owner}/{repo}/tags',
  },
  {
    url: `issues`,
    method: GET,
    endpoint: 'issues',
  },
  {
    url: `orgs/${org}/issues`,
    method: GET,
    endpoint: 'orgs/{org}/issues',
  },
  {
    url: `repos/${username}/${repo}/issues`,
    method: GET,
    endpoint: 'repos/{owner}/{repo}/issues',
  },
  {
    url: `repos/${username}/${repo}/issues/${issue_number}`,
    method: GET,
    endpoint: 'repos/{owner}/{repo}/issues/{issue_number}',
  },
  {
    url: `repos/${username}/${repo}/issues`,
    method: POST,
    endpoint: 'repos/{owner}/{repo}/issues',
    data: { title: randomWords() },
  },
  {
    url: `repos/${username}/${repo}/issues/${issue_number}`,
    method: PATCH,
    endpoint: 'repos/{owner}/{repo}/issues/{issue_number}',
    data: { body: randomWords() },
  },
  {
    url: `organizations`,
    method: GET,
    endpoint: 'organizations',
  },
  {
    url: `users/${username}/orgs`,
    method: GET,
    endpoint: 'users/{username}/orgs',
  },
  {
    url: `orgs/${org}`,
    method: GET,
    endpoint: 'orgs/{org}',
  },
  {
    url: `repos/${username}/${repo}/pulls`,
    method: GET,
    endpoint: 'repos/{owner}/{repo}/pulls',
  },
  {
    url: `repos/${username}/${repo}/pulls/${pull_number}`,
    method: GET,
    endpoint: 'repos/{owner}/{repo}/pulls/{pull_number}',
  },
  {
    url: `repos/${username}/${repo}/pulls/${pull_number}`,
    method: PATCH,
    endpoint: 'repos/{owner}/{repo}/pulls/{pull_number}',
    data: { body: randomWords() },
  },
  {
    url: `repos/${username}/${repo}/pulls/${pull_number}/commits`,
    method: GET,
    endpoint: 'repos/{owner}/{repo}/pulls/{pull_number}/commits',
  },
  {
    url: `repos/${username}/${repo}/pulls/${pull_number}/files`,
    method: GET,
    endpoint: 'repos/{owner}/{repo}/pulls/{pull_number}/files',
  },
  {
    url: `repos/${username}/${repo}/projects`,
    method: GET,
    endpoint: 'repos/{owner}/{repo}/projects',
    acceptHeader: 'application/vnd.github.inertia-preview+json',
  },
  {
    url: `orgs/${org}/projects`,
    method: GET,
    endpoint: 'orgs/{org}/projects',
    acceptHeader: 'application/vnd.github.inertia-preview+json',
  },
  {
    url: `users/${username}/projects`,
    method: GET,
    endpoint: 'users/{username}/projects',
    acceptHeader: 'application/vnd.github.inertia-preview+json',
  },
  {
    url: `repos/${username}/${repo}/projects`,
    method: POST,
    endpoint: 'repos/{owner}/{repo}/projects',
    acceptHeader: 'application/vnd.github.inertia-preview+json',
    data: { name: randomWords() },
  },
  {
    url: `orgs/${org}/projects`,
    method: POST,
    endpoint: 'orgs/{org}/projects',
    acceptHeader: 'application/vnd.github.inertia-preview+json',
    data: { name: randomWords() },
  },
]

export default endpoints
