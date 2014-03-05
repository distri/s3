(function(pkg) {
  // Expose a require for our package so scripts can access our modules
  window.require = Require.generateFor(pkg);
})({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2014 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "s3\n==\n\nUpload to S3\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "S3\n====\n\nUpload data directly to S3 from the client.\n\nUsage\n-----\n\n>     uploader = S3.uploader(JSON.parse(localStorage.S3Policy))\n>     uploader.upload\n>       key: \"myfile.text\"\n>       blob: new Blob [\"radical\"], type: \"text/plain\"\n\nThe policy is a JSON object with the following keys:\n\n- `accessKey`\n- `acl`\n- `bucket`\n- `policy`\n- `signature`\n\nSince these are all needed to create and sign the policy we keep them all\ntogether.\n\nGiving this object to the uploader method creates an uploader capable of \nasynchronously uploading files to the bucket specified in the policy.\n\nImplementation\n--------------\n\n    module.exports =\n      fetchPolicy: (callback) ->\n        xhr = new XMLHttpRequest\n        xhr.open('GET', \"http://locohost:5000/policy.json\", true)\n        xhr.onreadystatechange = ->\n          return if xhr.readyState != 4\n\n          callback JSON.parse(xhr.responseText)\n\n        xhr.send()\n\n        return xhr\n\n      uploader: (credentials) ->\n        {acl, bucket, policy, signature, accessKey} = credentials\n\n        upload: ({key, blob}) ->\n          sendForm \"https://#{bucket}.s3.amazonaws.com\",\n            key: key\n            \"Content-Type\": blob.type\n            AWSAccessKeyId: accessKey\n            acl: acl\n            policy: policy\n            signature: signature\n            file: blob\n\nHelpers\n-------\n\n    sendForm = (url, data) ->\n      xhr = new XMLHttpRequest\n      xhr.open('POST', url, true)\n\n      formData = Object.keys(data).reduce (formData, key) ->\n        formData.append(key, data[key])\n\n        return formData\n      , new FormData\n\n      xhr.send formData\n\n      return xhr\n\nTODO\n----\n\nAll the data could be extracted from the policy data itself without needing to\ndouble specify acl, bucket, etc.\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.1.0\"\n",
      "type": "blob"
    },
    "test/upload.coffee": {
      "path": "test/upload.coffee",
      "mode": "100644",
      "content": "require \"/main\"\n",
      "type": "blob"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var sendForm;\n\n  module.exports = {\n    fetchPolicy: function(callback) {\n      var xhr;\n      xhr = new XMLHttpRequest;\n      xhr.open('GET', \"http://locohost:5000/policy.json\", true);\n      xhr.onreadystatechange = function() {\n        if (xhr.readyState !== 4) {\n          return;\n        }\n        return callback(JSON.parse(xhr.responseText));\n      };\n      xhr.send();\n      return xhr;\n    },\n    uploader: function(credentials) {\n      var accessKey, acl, bucket, policy, signature;\n      acl = credentials.acl, bucket = credentials.bucket, policy = credentials.policy, signature = credentials.signature, accessKey = credentials.accessKey;\n      return {\n        upload: function(_arg) {\n          var blob, key;\n          key = _arg.key, blob = _arg.blob;\n          return sendForm(\"https://\" + bucket + \".s3.amazonaws.com\", {\n            key: key,\n            \"Content-Type\": blob.type,\n            AWSAccessKeyId: accessKey,\n            acl: acl,\n            policy: policy,\n            signature: signature,\n            file: blob\n          });\n        }\n      };\n    }\n  };\n\n  sendForm = function(url, data) {\n    var formData, xhr;\n    xhr = new XMLHttpRequest;\n    xhr.open('POST', url, true);\n    formData = Object.keys(data).reduce(function(formData, key) {\n      formData.append(key, data[key]);\n      return formData;\n    }, new FormData);\n    xhr.send(formData);\n    return xhr;\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.0\"};",
      "type": "blob"
    },
    "test/upload": {
      "path": "test/upload",
      "content": "(function() {\n  require(\"/main\");\n\n}).call(this);\n\n//# sourceURL=test/upload.coffee",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "version": "0.1.0",
  "entryPoint": "main",
  "repository": {
    "id": 17414952,
    "name": "s3",
    "full_name": "distri/s3",
    "owner": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
      "gravatar_id": null,
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/distri/s3",
    "description": "Upload to S3",
    "fork": false,
    "url": "https://api.github.com/repos/distri/s3",
    "forks_url": "https://api.github.com/repos/distri/s3/forks",
    "keys_url": "https://api.github.com/repos/distri/s3/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/distri/s3/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/distri/s3/teams",
    "hooks_url": "https://api.github.com/repos/distri/s3/hooks",
    "issue_events_url": "https://api.github.com/repos/distri/s3/issues/events{/number}",
    "events_url": "https://api.github.com/repos/distri/s3/events",
    "assignees_url": "https://api.github.com/repos/distri/s3/assignees{/user}",
    "branches_url": "https://api.github.com/repos/distri/s3/branches{/branch}",
    "tags_url": "https://api.github.com/repos/distri/s3/tags",
    "blobs_url": "https://api.github.com/repos/distri/s3/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/distri/s3/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/distri/s3/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/distri/s3/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/distri/s3/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/distri/s3/languages",
    "stargazers_url": "https://api.github.com/repos/distri/s3/stargazers",
    "contributors_url": "https://api.github.com/repos/distri/s3/contributors",
    "subscribers_url": "https://api.github.com/repos/distri/s3/subscribers",
    "subscription_url": "https://api.github.com/repos/distri/s3/subscription",
    "commits_url": "https://api.github.com/repos/distri/s3/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/distri/s3/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/distri/s3/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/distri/s3/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/distri/s3/contents/{+path}",
    "compare_url": "https://api.github.com/repos/distri/s3/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/distri/s3/merges",
    "archive_url": "https://api.github.com/repos/distri/s3/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/distri/s3/downloads",
    "issues_url": "https://api.github.com/repos/distri/s3/issues{/number}",
    "pulls_url": "https://api.github.com/repos/distri/s3/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/distri/s3/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/distri/s3/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/distri/s3/labels{/name}",
    "releases_url": "https://api.github.com/repos/distri/s3/releases{/id}",
    "created_at": "2014-03-04T19:56:43Z",
    "updated_at": "2014-03-04T19:56:43Z",
    "pushed_at": "2014-03-04T19:56:43Z",
    "git_url": "git://github.com/distri/s3.git",
    "ssh_url": "git@github.com:distri/s3.git",
    "clone_url": "https://github.com/distri/s3.git",
    "svn_url": "https://github.com/distri/s3",
    "homepage": null,
    "size": 0,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "organization": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
      "gravatar_id": null,
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "network_count": 0,
    "subscribers_count": 2,
    "branch": "master",
    "publishBranch": "gh-pages"
  },
  "dependencies": {}
});