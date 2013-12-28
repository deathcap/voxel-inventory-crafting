// Generated by CoffeeScript 1.6.3
(function() {
  var Inventory, InventoryDialog, InventoryWindow, ItemPile, ModalDialog,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Inventory = require('inventory');

  InventoryWindow = require('inventory-window');

  ItemPile = require('itempile');

  ModalDialog = require('voxel-modal-dialog');

  module.exports = function(game, opts) {
    return new InventoryDialog(game, opts);
  };

  module.exports.pluginInfo = {
    'loadAfter': ['craftingrecipes', 'voxel-carry']
  };

  InventoryDialog = (function(_super) {
    __extends(InventoryDialog, _super);

    function InventoryDialog(game, opts) {
      var contents, crDiv, craftCont, resultCont, _ref, _ref1,
        _this = this;
      this.game = game;
      this.playerInventory = (function() {
        var _ref1, _ref2, _ref3;
        if ((_ref = (_ref1 = (_ref2 = game.plugins) != null ? (_ref3 = _ref2.get('voxel-carry')) != null ? _ref3.inventory : void 0 : void 0) != null ? _ref1 : opts.playerInventory) != null) {
          return _ref;
        } else {
          throw 'voxel-inventory-dialog requires "voxel-carry" plugin or playerInventory" set to inventory instance';
        }
      })();
      this.recipes = (function() {
        var _ref2;
        if ((_ref1 = (_ref2 = game.plugins) != null ? _ref2.get('craftingrecipes') : void 0) != null) {
          return _ref1;
        } else {
          throw 'voxel-inventory-dialog requires "craftingrecipes" plugin';
        }
      })();
      this.playerIW = new InventoryWindow({
        inventory: this.playerInventory
      });
      this.craftInventory = new Inventory(2, 2);
      this.craftInventory.on('changed', function() {
        return _this.updateCraftingRecipe();
      });
      this.craftIW = new InventoryWindow({
        inventory: this.craftInventory
      });
      this.resultInventory = new Inventory(1);
      this.resultIW = new InventoryWindow({
        inventory: this.resultInventory,
        allowDrop: false,
        linkedInventory: this.playerInventory
      });
      this.resultIW.on('pickup', function() {
        return _this.tookCraftingOutput();
      });
      crDiv = document.createElement('div');
      crDiv.style.float = 'right';
      crDiv.style.marginBottom = '10px';
      craftCont = this.craftIW.createContainer();
      resultCont = this.resultIW.createContainer();
      resultCont.style.marginLeft = '30px';
      resultCont.style.marginTop = '15%';
      crDiv.appendChild(craftCont);
      crDiv.appendChild(resultCont);
      contents = [];
      contents.push(crDiv);
      contents.push(document.createElement('br'));
      contents.push(this.playerIW.createContainer());
      InventoryDialog.__super__.constructor.call(this, game, {
        contents: contents,
        escapeKeys: [27, 69]
      });
    }

    InventoryDialog.prototype.enable = function() {};

    InventoryDialog.prototype.disable = function() {};

    InventoryDialog.prototype.updateCraftingRecipe = function() {
      var recipe;
      recipe = this.recipes.find(this.craftInventory);
      console.log('found recipe', recipe);
      return this.resultInventory.set(0, recipe != null ? recipe.computeOutput(this.craftInventory) : void 0);
    };

    InventoryDialog.prototype.tookCraftingOutput = function() {
      var recipe;
      recipe = this.recipes.find(this.craftInventory);
      if (recipe == null) {
        return;
      }
      recipe.craft(this.craftInventory);
      return this.craftInventory.changed();
    };

    return InventoryDialog;

  })(ModalDialog);

}).call(this);
