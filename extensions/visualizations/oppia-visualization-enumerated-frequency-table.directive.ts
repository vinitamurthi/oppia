// Copyright 2019 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Directive for "enumerated frequency table" visualization.
 */

require('directives/angular-html-bind.directive.ts');

require('domain/utilities/url-interpolation.service.ts');
require('services/HtmlEscaperService.ts');

// Each visualization receives three variables: 'data', 'options', and
// 'isAddressed'. The exact format for each of these is specific to the
// particular visualization.
angular.module('oppia').directive(
  'oppiaVisualizationEnumeratedFrequencyTable', [
    'UrlInterpolationService', function(UrlInterpolationService) {
      return {
        restrict: 'E',
        scope: {},
        bindToController: {},
        templateUrl: UrlInterpolationService.getExtensionResourceUrl(
          '/visualizations/enumerated-frequency-table.directive.html'),
        controllerAs: '$ctrl',
        controller: [
          '$attrs', 'HtmlEscaperService',
          function($attrs, HtmlEscaperService) {
            var ctrl = this;
            ctrl.data = HtmlEscaperService.escapedJsonToObj($attrs.escapedData);
            ctrl.options =
              HtmlEscaperService.escapedJsonToObj($attrs.escapedOptions);
            ctrl.addressedInfoIsSupported = $attrs.addressedInfoIsSupported;

            ctrl.answerVisible = ctrl.data.map(function(_, i) {
              // First element is shown while all others are hidden by default.
              return i === 0;
            });
            ctrl.toggleAnswerVisibility = function(i) {
              ctrl.answerVisible[i] = !ctrl.answerVisible[i];
            };
          }
        ]
      };
    }
  ]);
