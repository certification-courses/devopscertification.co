/// <reference path="angular.min.js"/>

var myApp = angular
				.module("myModule", [])
				.controller("myController", function ($scope)
				{
					var pic = {
					 photo: "img/ads/youtube-channel.png",
					 url: "https://bit.ly/2KoLMcE",
					 photo1: "img/ads/devops-course.png",
					 url1: "https://bit.ly/2pYmbKB",
					};
					$scope.pic= pic;
				});
				