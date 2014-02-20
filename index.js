// Generated by CoffeeScript 1.7.0
(function() {
  var Inventory, InventoryCrafting, InventoryDialog, InventoryWindow, ItemPile,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Inventory = require('inventory');

  InventoryWindow = require('inventory-window');

  ItemPile = require('itempile');

  InventoryDialog = (require('voxel-inventory-dialog')).InventoryDialog;

  module.exports = function(game, opts) {
    return new InventoryCrafting(game, opts);
  };

  module.exports.pluginInfo = {
    'loadAfter': ['voxel-recipes', 'voxel-carry', 'voxel-registry']
  };

  InventoryCrafting = (function(_super) {
    __extends(InventoryCrafting, _super);

    function InventoryCrafting(game, opts) {
      var craftCont, resultCont, _ref, _ref1;
      this.game = game;
      this.recipes = (function() {
        var _ref1;
        if ((_ref = (_ref1 = game.plugins) != null ? _ref1.get('voxel-recipes') : void 0) != null) {
          return _ref;
        } else {
          throw new Error('voxel-inventory-crafting requires "voxel-recipes" plugin');
        }
      })();
      this.registry = (function() {
        var _ref2;
        if ((_ref1 = (_ref2 = game.plugins) != null ? _ref2.get('voxel-registry') : void 0) != null) {
          return _ref1;
        } else {
          throw new Error('voxel-inventory-crafting requires "voxel-registry" plugin');
        }
      })();
      this.craftInventory = new Inventory(2, 2);
      this.craftInventory.on('changed', (function(_this) {
        return function() {
          return _this.updateCraftingRecipe();
        };
      })(this));
      this.craftIW = new InventoryWindow({
        inventory: this.craftInventory,
        registry: this.registry,
        linkedInventory: this.playerInventory
      });
      this.resultInventory = new Inventory(1);
      this.resultIW = new InventoryWindow({
        inventory: this.resultInventory,
        registry: this.registry,
        allowDrop: false,
        linkedInventory: this.playerInventory
      });
      this.resultIW.on('pickup', (function(_this) {
        return function() {
          return _this.tookCraftingOutput();
        };
      })(this));
      craftCont = this.craftIW.createContainer();
      resultCont = this.resultIW.createContainer();
      resultCont.style.marginLeft = '30px';
      resultCont.style.marginTop = '15%';
      InventoryCrafting.__super__.constructor.call(this, game, {
        upper: [craftCont, resultCont]
      });
    }

    InventoryCrafting.prototype.enable = function() {};

    InventoryCrafting.prototype.disable = function() {};

    InventoryCrafting.prototype.updateCraftingRecipe = function() {
      var recipe;
      recipe = this.recipes.find(this.craftInventory);
      console.log('found recipe', recipe);
      return this.resultInventory.set(0, recipe != null ? recipe.computeOutput(this.craftInventory) : void 0);
    };

    InventoryCrafting.prototype.tookCraftingOutput = function() {
      var recipe;
      recipe = this.recipes.find(this.craftInventory);
      if (recipe == null) {
        return;
      }
      recipe.craft(this.craftInventory);
      return this.craftInventory.changed();
    };

    return InventoryCrafting;

  })(InventoryDialog);

}).call(this);
