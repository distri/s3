window["distri/s3:v0.2.0"]({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2014 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
      "mode": "100644",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "content": "s3\n==\n\nUpload to S3\n",
      "mode": "100644",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "content": "S3\n====\n\nUpload data directly to S3 from the client.\n\nUsage\n-----\n\n>     uploader = S3.uploader(JSON.parse(localStorage.S3Policy))\n>     uploader.upload\n>       key: \"myfile.text\"\n>       blob: new Blob [\"radical\"]\n>       cacheControl: 60 # default 31536000\n\nThe policy is a JSON object with the following keys:\n\n- `accessKey`\n- `acl`\n- `bucket`\n- `policy`\n- `signature`\n\nSince these are all needed to create and sign the policy we keep them all\ntogether.\n\nGiving this object to the uploader method creates an uploader capable of\nasynchronously uploading files to the bucket specified in the policy.\n\nNotes\n-----\n\nThe policy must specify a `Cache-Control` header because we always try to set it.\n\nImplementation\n--------------\n\n    module.exports =\n      fetchPolicy: (callback) ->\n        xhr = new XMLHttpRequest\n        xhr.open('GET', \"http://locohost:5000/policy.json\", true)\n        xhr.onreadystatechange = ->\n          return if xhr.readyState != 4\n\n          callback JSON.parse(xhr.responseText)\n\n        xhr.send()\n\n        return xhr\n\n      uploader: (credentials) ->\n        {acl, bucket, policy, signature, accessKey} = credentials\n\n        upload: ({key, blob, cacheControl}) ->\n          sendForm \"https://#{bucket}.s3.amazonaws.com\",\n            key: key\n            \"Content-Type\": blob.type\n            \"Cache-Control\": \"max-age=#{cacheControl or 31536000}\"\n            AWSAccessKeyId: accessKey\n            acl: acl\n            policy: policy\n            signature: signature\n            file: blob\n\nHelpers\n-------\n\n    sendForm = (url, data) ->\n      xhr = new XMLHttpRequest\n      xhr.open('POST', url, true)\n\n      formData = Object.keys(data).reduce (formData, key) ->\n        formData.append(key, data[key])\n\n        return formData\n      , new FormData\n\n      xhr.send formData\n\n      return xhr\n\nTODO\n----\n\nAll the data could be extracted from the policy data itself without needing to\ndouble specify acl, bucket, etc.\n",
      "mode": "100644",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "content": "version: \"0.2.0\"\n",
      "mode": "100644",
      "type": "blob"
    },
    "test/upload.coffee": {
      "path": "test/upload.coffee",
      "content": "global.S3 = require \"/main\"\n",
      "mode": "100644",
      "type": "blob"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var sendForm;\n\n  module.exports = {\n    fetchPolicy: function(callback) {\n      var xhr;\n      xhr = new XMLHttpRequest;\n      xhr.open('GET', \"http://locohost:5000/policy.json\", true);\n      xhr.onreadystatechange = function() {\n        if (xhr.readyState !== 4) {\n          return;\n        }\n        return callback(JSON.parse(xhr.responseText));\n      };\n      xhr.send();\n      return xhr;\n    },\n    uploader: function(credentials) {\n      var accessKey, acl, bucket, policy, signature;\n      acl = credentials.acl, bucket = credentials.bucket, policy = credentials.policy, signature = credentials.signature, accessKey = credentials.accessKey;\n      return {\n        upload: function(_arg) {\n          var blob, cacheControl, key;\n          key = _arg.key, blob = _arg.blob, cacheControl = _arg.cacheControl;\n          return sendForm(\"https://\" + bucket + \".s3.amazonaws.com\", {\n            key: key,\n            \"Content-Type\": blob.type,\n            \"Cache-Control\": \"max-age=\" + (cacheControl || 31536000),\n            AWSAccessKeyId: accessKey,\n            acl: acl,\n            policy: policy,\n            signature: signature,\n            file: blob\n          });\n        }\n      };\n    }\n  };\n\n  sendForm = function(url, data) {\n    var formData, xhr;\n    xhr = new XMLHttpRequest;\n    xhr.open('POST', url, true);\n    formData = Object.keys(data).reduce(function(formData, key) {\n      formData.append(key, data[key]);\n      return formData;\n    }, new FormData);\n    xhr.send(formData);\n    return xhr;\n  };\n\n}).call(this);\n",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.2.0\"};",
      "type": "blob"
    },
    "test/upload": {
      "path": "test/upload",
      "content": "(function() {\n  global.S3 = require(\"/main\");\n\n}).call(this);\n",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://www.danielx.net/editor/"
  },
  "version": "0.2.0",
  "entryPoint": "main",
  "repository": {
    "branch": "v0.2.0",
    "default_branch": "master",
    "full_name": "distri/s3",
    "homepage": null,
    "description": "Upload to S3",
    "html_url": "https://github.com/distri/s3",
    "url": "https://api.github.com/repos/distri/s3",
    "publishBranch": "gh-pages"
  },
  "dependencies": {}
});