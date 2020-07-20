## [0.4.2](https://github.com/appcelerator/titanium-vdom/compare/0.4.1...0.4.2) (2020-07-20)


### Bug Fixes

* add missing NavigationWindow element ([#49](https://github.com/appcelerator/titanium-vdom/issues/49)) ([2c31d75](https://github.com/appcelerator/titanium-vdom/commit/2c31d75e294d642ecdad377447a55f0eecd45269))


## [0.4.1](https://github.com/appcelerator/titanium-vdom/compare/0.4.0...0.4.1) (2020-07-14)


### Bug Fixes

* maintain element order when inserting into visual tree ([3f16105](https://github.com/appcelerator/titanium-vdom/commit/3f161054939d6abfd6552d7e66bae4d0c5ccd584))


# [0.4.0](https://github.com/appcelerator/titanium-vdom/compare/0.3.2...0.4.0) (2020-07-08)


### Bug Fixes

* always use lowercase tag in outerHTML ([76ac43a](https://github.com/appcelerator/titanium-vdom/commit/76ac43ac6f4385ee5accc154d147136dda4c3c64))
* apply attributes with correct case and type during proxy creation ([4abdf59](https://github.com/appcelerator/titanium-vdom/commit/4abdf592451cc354edca6ea97cb3d262dab2bfed))
* avoid insertAt when inserting table view row children ([13ae5eb](https://github.com/appcelerator/titanium-vdom/commit/13ae5eb18eea345beb5da5ef57968625e264fd44))
* do not throw if no visual element found ([37c3c60](https://github.com/appcelerator/titanium-vdom/commit/37c3c6089d476997f8f7626a51b546198ebe67ef))
* exclude properties fromnumber conversion ([7af8c23](https://github.com/appcelerator/titanium-vdom/commit/7af8c23a80bc32e9cb4f92d3310f2555848e7da4))
* improve isNumeric test ([7151dbc](https://github.com/appcelerator/titanium-vdom/commit/7151dbc01aebc531201d2e9ff5848ca0eaf14eb8))
* move buttonbar to ios only elements ([169b817](https://github.com/appcelerator/titanium-vdom/commit/169b81755a15a87159974a230b03a652f2829897))
* normalize tag name in getViewFactory ([e8dfcd5](https://github.com/appcelerator/titanium-vdom/commit/e8dfcd51def21ea348baeb87a3fac891500debc0))
* set event handler on visual child ([600c74f](https://github.com/appcelerator/titanium-vdom/commit/600c74f6c7cf453b07942ac1b0eff461bc20b0eb))
* store tag name in upper case ([380198f](https://github.com/appcelerator/titanium-vdom/commit/380198f8fc1ab1c14a2557fe149447f9a70343af))
* **registry:** update element properties ([9f1609e](https://github.com/appcelerator/titanium-vdom/commit/9f1609e10643b640fede10976762b270a7f5e52c))
* project events to visual elements ([8e8d808](https://github.com/appcelerator/titanium-vdom/commit/8e8d80831089862ba976b82017eb6173a4017271))
* update library exports ([b1c0f91](https://github.com/appcelerator/titanium-vdom/commit/b1c0f91c885ca54146b80874b3f68be01641c40a))
* update metadata for list and table view ([744b253](https://github.com/appcelerator/titanium-vdom/commit/744b253560fbd216f67de13d178e9a688b1ba0c4))
* update text using property instead of setter ([9715b32](https://github.com/appcelerator/titanium-vdom/commit/9715b329cea4cbb9be855e6eab7a35ded5e64bd9))
* use cross-platform views ([adb1ff2](https://github.com/appcelerator/titanium-vdom/commit/adb1ff2367d340cb4a2218f45b178943ecd8c9b8))
* use hasAttribute to check for boolean attribute ([281f26d](https://github.com/appcelerator/titanium-vdom/commit/281f26d479f9a35155a3efd54f6ac577ae0f2ca8))


### Features

* accessor for first visual child ([fe494ba](https://github.com/appcelerator/titanium-vdom/commit/fe494ba0ab70630fad8192173f5ab771ea5ffab7))
* use built-in tag name normalization ([0f752cc](https://github.com/appcelerator/titanium-vdom/commit/0f752cc517ab1ce803dfaa59ada3f810979d5a9c))
* use namespaced attributes for platform handling ([2e2d71d](https://github.com/appcelerator/titanium-vdom/commit/2e2d71db52b927f98f5346a1f5a2d906778fc1d1))


### BREAKING CHANGES

* `setAttribute`/`removeAttribute` don't accept a platform parameter anymore. Use `setAttributeNS`/`removeAttributeNS` to set platform specific attribute. The namesapce is treated as the platform filter.
* Element `tagName` and `nodeName` are now always stored in upper case.
* Removes custom naming strategies. Tag names will always be stores normalized and lookup automatically works for both camel case and kebab case



## [0.3.2](https://github.com/appcelerator/titanium-vdom/compare/0.3.1...0.3.2) (2018-10-13)



## [0.3.1](https://github.com/appcelerator/titanium-vdom/compare/0.3.0...0.3.1) (2018-10-13)



# [0.3.0](https://github.com/appcelerator/titanium-vdom/compare/0.2.0...0.3.0) (2018-10-08)



# [0.2.0](https://github.com/appcelerator/titanium-vdom/compare/0.1.0...0.2.0) (2018-09-20)


### Bug Fixes

* add missing elements and fix some metadata ([#10](https://github.com/appcelerator/titanium-vdom/issues/10)) ([960b13f](https://github.com/appcelerator/titanium-vdom/commit/960b13fc21d298b9bacdef37cd3d2f6c9ed75018))
* improve api for platform scoped attributes ([#8](https://github.com/appcelerator/titanium-vdom/issues/8)) ([f4880da](https://github.com/appcelerator/titanium-vdom/commit/f4880da221555a0109e5d6668e100870c75f0c77))
* **registry:** move iOS only elements ([#3](https://github.com/appcelerator/titanium-vdom/issues/3)) ([bc74586](https://github.com/appcelerator/titanium-vdom/commit/bc745860654a73f49885597d937e0c958e7431f7))
* **registry:** only print duplicate element warning in Titanium ([#5](https://github.com/appcelerator/titanium-vdom/issues/5)) ([37e92dc](https://github.com/appcelerator/titanium-vdom/commit/37e92dc3a9e9f647d47189db35ffc7b0501718e3))
* **registry:** proper type check Ti global ([#7](https://github.com/appcelerator/titanium-vdom/issues/7)) ([05198d0](https://github.com/appcelerator/titanium-vdom/commit/05198d0d0a7f32ddad6352f290f960ef31792710))
* load all elements for AoT compilers ([29678f8](https://github.com/appcelerator/titanium-vdom/commit/29678f831234307a3718fe40a90048cf96901e6a))


### Features

* add platform elements ([#9](https://github.com/appcelerator/titanium-vdom/issues/9)) ([508146f](https://github.com/appcelerator/titanium-vdom/commit/508146fc020aa376f49d878d626bae4411d2276c))



# [0.1.0](https://github.com/appcelerator/titanium-vdom/compare/b293ac3321afed285994f1463b19a17f54d7bc2a...0.1.0) (2018-06-30)


### Bug Fixes

* **element:** remove child from titanium views ([1f6caaa](https://github.com/appcelerator/titanium-vdom/commit/1f6caaa20a6b9e8a3a361f9b19bfa122b7e8feac))
* ensure pre insertion validity ([580c070](https://github.com/appcelerator/titanium-vdom/commit/580c0708aeb0b756da6366e4d9867c488b6dba00))
* lower generic type restriction to all proxies ([766a008](https://github.com/appcelerator/titanium-vdom/commit/766a00845d1c29d8f523bf404e3907b56443083d))
* move some apis to comply with W3C spec ([2320acb](https://github.com/appcelerator/titanium-vdom/commit/2320acb6c558251c091878fdb980dc8158ce7fbe))
* resolve circular dependency ([b293ac3](https://github.com/appcelerator/titanium-vdom/commit/b293ac3321afed285994f1463b19a17f54d7bc2a))


### Features

* **element:** add options to detach element tree from view hierarchy ([#1](https://github.com/appcelerator/titanium-vdom/issues/1)) ([8313cb3](https://github.com/appcelerator/titanium-vdom/commit/8313cb30bef4155368bdde120d6f4ea7cd6cdb67))
* add titanium element registry ([16f503d](https://github.com/appcelerator/titanium-vdom/commit/16f503d8ab7239b54574906baf02acbad8c26963))


