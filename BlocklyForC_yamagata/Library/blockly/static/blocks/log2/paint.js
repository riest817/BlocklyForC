/**
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Variable blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.paint');

goog.require('Blockly.Blocks');


Blockly.Blocks['paint_stroke'] = {
  init: function() {
    this.setColour(20);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendTitle('線の色');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['paint_strokeweight'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendValueInput('WEIGHT')
        .setCheck('Number')
        .appendTitle('線の太さ');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['paint_fill'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(20);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendTitle('塗りつぶしの色');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['paint_line'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput('X1')
        .setCheck('Number')
        .appendTitle('座標1(');
    this.appendValueInput('Y1')
        .setCheck('Number')
        .appendTitle(',');
    this.appendValueInput('X2')
        .setCheck('Number')
        .appendTitle(') から')
        .appendTitle('座標2(');
    this.appendValueInput('Y2')
        .setCheck('Number')
        .appendTitle(',');
    this.appendDummyInput()
        .appendTitle(') まで')
        .appendTitle('線を引く');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['paint_rect'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput('X1')
        .setCheck('Number')
        .appendTitle('左上の頂点の座標が(');
    this.appendValueInput('Y1')
        .setCheck('Number')
        .appendTitle(',');
    this.appendValueInput('W')
        .setCheck('Number')
        .appendTitle(')')
        .appendTitle('幅');
    this.appendValueInput('H')
        .setCheck('Number')
        .appendTitle('高さ');
    this.appendDummyInput()
        .appendTitle('の')
        .appendTitle('長方形を描く');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['paint_ellipse'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput('X1')
        .setCheck('Number')
        .appendTitle('中心の座標が(');
    this.appendValueInput('Y1')
        .setCheck('Number')
        .appendTitle(',');
    this.appendValueInput('W')
        .setCheck('Number')
        .appendTitle(')')
        .appendTitle('幅');
    this.appendValueInput('H')
        .setCheck('Number')
        .appendTitle('高さ');
    this.appendDummyInput()
        .appendTitle('の')
        .appendTitle('楕円を描く');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};

Blockly.Blocks['paint_triangle'] = {
  init: function() {
    //this.setHelpUrl('http://www.example.com/');
    this.setColour(180);
    this.appendValueInput('X1')
        .setCheck('Number')
        .appendTitle('座標1(');
    this.appendValueInput('Y1')
        .setCheck('Number')
        .appendTitle(',');
    this.appendValueInput('X2')
        .setCheck('Number')
        .appendTitle(')')
        .appendTitle('座標2(');
    this.appendValueInput('Y2')
        .setCheck('Number')
        .appendTitle(',');
    this.appendValueInput('X3')
        .setCheck('Number')
        .appendTitle(')')
        .appendTitle('座標3(');
    this.appendValueInput('Y3')
        .setCheck('Number')
        .appendTitle(',');
    this.appendDummyInput()
        .appendTitle(') を結ぶ')
        .appendTitle('三角形を描く');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setTooltip('');
  }
};