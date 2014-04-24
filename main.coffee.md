S3
====

Upload data directly to S3 from the client.

Usage
-----

>     uploader = S3.uploader(JSON.parse(localStorage.S3Policy))
>     uploader.upload
>       key: "myfile.text"
>       blob: new Blob ["radical"]
>       cacheControl: 60 # default 31536000

The policy is a JSON object with the following keys:

- `accessKey`
- `acl`
- `bucket`
- `policy`
- `signature`

Since these are all needed to create and sign the policy we keep them all
together.

Giving this object to the uploader method creates an uploader capable of
asynchronously uploading files to the bucket specified in the policy.

Notes
-----

The policy must specify a `Cache-Control` header because we always try to set it.

Implementation
--------------

    module.exports =
      fetchPolicy: (callback) ->
        xhr = new XMLHttpRequest
        xhr.open('GET', "http://locohost:5000/policy.json", true)
        xhr.onreadystatechange = ->
          return if xhr.readyState != 4

          callback JSON.parse(xhr.responseText)

        xhr.send()

        return xhr

      uploader: (credentials) ->
        {acl, bucket, policy, signature, accessKey} = credentials

        upload: ({key, blob, cacheControl}) ->
          sendForm "https://#{bucket}.s3.amazonaws.com",
            key: key
            "Content-Type": blob.type
            "Cache-Control": "max-age=#{cacheControl or 31536000}"
            AWSAccessKeyId: accessKey
            acl: acl
            policy: policy
            signature: signature
            file: blob

Helpers
-------

    sendForm = (url, data) ->
      xhr = new XMLHttpRequest
      xhr.open('POST', url, true)

      formData = Object.keys(data).reduce (formData, key) ->
        formData.append(key, data[key])

        return formData
      , new FormData

      xhr.send formData

      return xhr

TODO
----

All the data could be extracted from the policy data itself without needing to
double specify acl, bucket, etc.
