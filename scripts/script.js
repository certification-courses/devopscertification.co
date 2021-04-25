/// <reference path="angular.min.js"/>

var myApp = angular
				.module("myModule", [])
				.controller("myController", function ($scope)
				{
					var pic = {
					 photo: "img/youtube-channel.png",
					 url: "https://bit.ly/2KoLMcE",
					 
					};
					$scope.pic= pic;
				});
				