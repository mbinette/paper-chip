/**
Material Design: [Chips](http://www.google.com/design/spec/components/chips.html)

`paper-chip` is a small element that represents a complex entity such as a
calendar event or a contact. The chip can be in an opened or closed state. In
its closed state, it contains an icon and a short title. In its open state, the
chip expands to show more detail about the represented entity, as well as
(optionally) a "remove" button that removes the chip element from the DOM.

The following child elements may be placed within the chip tag define its
content:

  * .icon: The icon representing the chip. This may be any element, for
            example, a `<iron-icon>` or a simple `<span>` with a single letter
  * .label: The chip label, shown in both closed and opened states
  * .caption: A secondary label, shown only in the opened state
  * all other content will be shown in the opened chip

The `removable` attribute can be used to add a button which removes the chip
from the DOM.

## Examples:

Removable chip with iron-icon

    <paper-chip removable>
      <iron-icon class="icon" icon="avatars:avatar-1"></iron-icon>
      <div slot="label">John Doe</div>
      <div slot="caption">jdoe@example.com</div>
    </paper-chip>

Basic chip with single letter instead of an icon

    <paper-chip label="Jane Doe">
      <div slot="icon">J</div>
      <div slot="label">jdoe@example.com</div>
    </paper-chip>


@element paper-chip
@blurb A basic "chip" element representing an icon/image and a short piece of text.
@homepage http://bendavis78.github.io/paper-chip/
@demo demo/index.html
*/
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { IronButtonState} from '@polymer/iron-behaviors/iron-button-state.js';
import { IronControlState } from '@polymer/iron-behaviors/iron-control-state.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-styles/element-styles/paper-material-styles.js';

Polymer({
  _template: html`
    <style include="paper-material-styles">
      :host {
        display: inline-block;
        vertical-align: top;
        position: relative;
        outline: none;
        font-size: 14px;
        cursor: default;
        margin: 8px 0;
        height: 32px;
        overflow: visible;
        @apply --paper-chip;
      }
      :host([animated]) *,
      :host([animated]) ::slotted(*) {
        transition: 200ms ease-in;
      }
/*        
      This is because in Shadow DOM (Chrome), hidden is given display: none; without the !important. 
      In Shady DOM (any browser using the polyfill), hidden is given display: none !important;
      This is to compensate until it is fixed in polymer itself.
*/        
      [hidden] {
        display: none !important;
      }
      #main, #chip {
        border-radius: 16px;
      }
      #main {
        background-color: var(--paper-chip-background-color, var(--paper-grey-200));
        position: relative;
        color: var(--paper-chip-secondary-text-color, var(--secondary-text-color));
        @apply --layout-vertical;
      }
      #chip {
        box-sizing: border-box;
        height: 32px;
        @apply --layout-horizontal;
        @apply --layout-center;
      }
      #shadow {
      /*paper-material {*/
        border-radius: 16px;
      }
      #icon {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --layout-center-justified;
      }
      #icon ::slotted([slot=icon]) {
        margin-right: -4px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        border-radius: 100%;
        overflow: hidden;
        text-align: center;
        vertical-align: middle;
        font-size: 16px;
        font-weight: bold;
        background-color: var(--paper-chip-icon-background-color, var(--paper-grey-500));
        color: var(--paper-chip-icon-text-color, var(--text-primary-color));
        @apply --layout-flex;
      }
      #icon ::slotted(iron-icon.icon),
      #icon ::slotted(iron-icon.icon svg) { /* FIXME: only top-level selectors allowed */
        width: 32px;
        height: 32px;
      }
      #icon ::slotted(iron-icon.icon) {
        vertical-align: bottom;
      }
      #label {
        padding: 0 4px 0 12px;
        @apply --layout-flex-auto;
        @apply --layout-self-center;
      }
      :host([single-line]:not([removable])) #label {
        padding-right: 12px;
      }
      #label ::slotted([slot=label]),
      #label ::slotted([slot=caption]) {
        display: block;
        white-space: nowrap;
        margin: 0;
        font-weight: normal;
        font-size: 14px;
      }
      #label ::slotted([slot=label]) {
        @apply --paper-chip-label;
      }
      #label ::slotted([slot=caption]) {
        @apply --paper-chip-caption;
      }
      .icon-btn-wrapper {
        @apply --layout-self-center;
      }
      #removeBtn {
        position: relative;
        margin: 0 8px 0 4px;
        padding: 2px;
        width: 12px;
        height: 12px;
        border-radius: 100%;
        background-color: var(--paper-chip-removebtn-background-color, var(--paper-grey-400));
        color: var(--paper-chip-removebtn-icon-color, var(--text-primary-color));
        cursor: pointer;
        @apply --paper-chip-removebtn;
      }
      #removeBtn iron-icon {
        width: 12px;
        height: 12px;
        display: block;
        @apply --paper-chip-removebtn-icon;
      }
      :host(:not([removable])) #removeBtn {
        display: none;
      }
      #selectBtn {
        position: relative;
        margin: 0 8px 0 4px;
        padding: 2px;
        width: 12px;
        height: 12px;
        border-radius: 100%;
        background-color: var(--paper-chip-selectbtn-background-color, var(--paper-grey-400));
        color: var(--paper-chip-selectbtn-icon-color, var(--text-primary-color));
        cursor: pointer;
        @apply --paper-chip-selectbtn;
      }
      #selectBtn iron-icon {
        width: 12px;
        height: 12px;
        display: block;
        stroke-width: 2;
        stroke: var(--paper-chip-selectbtn-icon-color, var(--text-primary-color));
        @apply --paper-chip-selectbtn-icon;
      }
      :host(:not([selectable])) #selectBtn {
        display: none;
      }
      /* pressed state */
      :host([pressed]) #main {
        background-color: var(--paper-chip-pressed-background-color, var(--paper-grey-300));
      }

      /* initially hidden elements */
      :host(:not([opened])) #label ::slotted([slot=caption]) {
        color: var(--paper-chip-secondary-text-color, var(--secondary-text-color));
        font-size: 0;
        height: 0;
      }
      :host(:not([persist-remove-button]):not([single-line]):not([opened])) #removeBtn,
      :host(:not([persist-remove-button]):not([single-line]):not([opened])) #removeBtn .icon {
        width: 0;
        height: 0;
        margin: 0;
        padding: 0;
      }
      :host(:not([persist-remove-button]):not([single-line]):not([opened])) #label {
        padding-right: 12px;
      }
      :host(:not([opened])) #content {
        width: 0;
        height: 0;
        min-width: 100%;
        overflow: hidden;
      }
      :host(:not([opened])) #label ::slotted([slot=label]) {
        color: var(--paper-chip-secondary-text-color, var(--secondary-text-color));
      }

      /* opened state */
      :host([opened]) #main, :host([opened]) #chip {
        border-radius: 0;
      }
      :host([opened]) #content {
        height: auto;
        width: auto;
        min-width: 100%;
        overflow: hidden;
        @apply --paper-chip-content;
      }
      :host([opened]) #chip {
        height: 72px;
      }
      :host([opened]) #chip,
      :host([opened]) #content ::slotted(*) {
        padding: 16px 12px;
        background-color: var(--paper-chip-opened-background-color, var(--paper-grey-50));
      }
      :host([opened]) #label ::slotted([slot=label]) {
        color: var(--paper-chip-primary-text-color, var(--primary-text-color));
        font-size: 16px;
        @apply --paper-chip-label-opened;
      }
      :host([opened]) paper-material {
        border-radius: 0;
      }
      :host([opened]) #icon ::slotted([slot=icon]),
      :host([opened]) #icon ::slotted(iron-icon.icon svg) { /* FIXME: only top-level selectors allowed) */
        font-size: 20px;
        width: 40px;
        height: 40px;
        line-height: 40px;
      }
      :host([opened]) #removeBtn {
        padding: 4px;
        margin-left: 20px;
        width: 16px;
        height: 16px;
      }
      :host([opened]) #removeBtn iron-icon {
        width: 16px;
        height: 16px;
      }
      :host([opened]) #selectBtn {
        padding: 4px;
        margin-left: 20px;
        width: 16px;
        height: 16px;
      }
      :host([opened]) #selectBtn iron-icon {
        width: 16px;
        height: 16px;
      }

      /* open + active state */
      :host([opened][active]) #chip,
      :host([opened][active]) ::slotted {
        background-color: var(--paper-chip-active-color, var(--accent-color));
				color: var(--paper-chip-active-text-color, var(--text-primary-color));
      }
      :host([opened][active]) #removeBtn {
        color: var(--paper-chip-active-color, var(--accent-color));
        background-color: var(--paper-chip-active-text-color, var(--text-primary-color));
      }
      :host([opened][active]) #selectBtn {
        color: var(--paper-chip-active-color, var(--accent-color));
        background-color: var(--paper-chip-active-text-color, var(--text-primary-color));
      }
      :host([opened][active]) #chip #label ::slotted([slot=label]) {
        color: var(--paper-chip-active-text-color, var(--text-primary-color));
      }
      :host([opened][active]) #chip #label ::slotted(h2) {
        color: var(--paper-chip-active-secondary-text-color, var(--text-primary-color));
      }
    </style>
    <div id="shadow" class="paper-material" elevation="{{_elevation}}" animated\$="{{animated}}">
      <div id="main">
        <div id="chip">
          <div id="icon">
            <slot name="icon"></slot>
          </div>
          <div id="label">
            <slot name="label"></slot>
            <slot name="caption"></slot>
          </div>
          <div id="removeBtn" on-tap="remove" aria-label="remove button">
            <iron-icon icon="close" class="icon"></iron-icon>
          </div>
          <div id="selectBtn" on-tap="select" aria-label="select button">
            <iron-icon icon="check" class="icon" hidden\$="[[!selected]]"></iron-icon>
          </div>
        </div>
        <div id="content">
          <slot></slot>
        </div>
      </div>
    </div>
`,

  is: 'paper-chip',

  behaviors: [
    IronButtonState,
    IronControlState,
  ],

  properties: {
    /**
     * Whether or not the chip is removable. If `true`, a remove button will
     * be shown.
     *
     * @attribute removable
     * @type boolean
     * @default false
     */
    removable: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /**
     * Whether or not the chip is selectable. If `true`, a select button will
     * be shown and act like a checkbox.
     *
     * @attribute selectable
     * @type boolean
     * @default false
     */
     selectable: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /**
     * Whether or not the chip is selected. Requires selectable to be true.
     *
     * @attribute selected
     * @type boolean
     * @default false
     */
     selected: {
      type: Boolean,
      notify: true,
      value: false,
      reflectToAttribute: true
    },

    /**
     * Whether or not the chip contains additional content. Single-line chips do not open.
     */
    singleLine: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
      observer: '_singleLineChanged',
    },

    /**
     * Always show remove button
     */
    persistRemoveButton: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
      observer: '_singleLineChanged'
    },

    /**
     * Whether or not the chip uses an animated transition between opened and
     * closed states
     *
     * @attribute animated
     * @type boolean
     * @default true
     */
    animated: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },

    /**
     * Whether or not the chip is in its opened state.
     *
     * @attribute opened
     * @type boolean
     * @default false
     */
    opened: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
      notify: true,
      observer: '_openedChanged'
    },

    /**
     * Whether or not the chip state is "active". If `true`, the main chip
     * area will be highlighted when in the opened state.
     *
     * @attribute active
     * @type boolean
     * @default false
     */
    active: {
      type: Boolean,
      value: false,
      notify: true,
      reflectToAttribute: true
    },

    _elevation: {
      type: Number,
      computed: '_computeElevation(opened, focused, disabled, active, pressed)'
    },

    _keyTarget: {
      type: Object,
      value: function() {
        return this;
      }
    },
  },

  listeners: {
    tap: '_onTap',
    blur: '_onBlur'
  },

  hostAttributes: {
    tabindex: '0'
  },

  ready: function() {
    if (this.$.removeBtn) {
      // disable tabindex on remove button so that tabindex can be used for chips
      this.$.removeBtn.removeAttribute('tabindex');
    }
    if (this.$.selectBtn) {
      // disable tabindex on select button so that tabindex can be used for chips
      this.$.selectBtn.removeAttribute('tabindex');
    }
  },

  _computeElevation: function(opened, focused, pressed) {
    if (focused || pressed) {
      return 1;
    }
    if (opened) {
      return 4;
    }
    return 0;
  },

  _onTap: function() {
    this.toggleOpened();
  },

  _onBlur: function() {
    this.opened = false;
  },

  /**
   * Fired before the element is removed. This event is cancelable.
   *
   * @event remove
   */
  remove: function(event) {
    event.stopPropagation();
    var e = this.fire('remove', {}, {bubbles: false, cancelable: true});
    if (!e.defaultPrevented) {
      this.parentNode.removeChild(this);
    }
  },

  /**
   * Change selection.
   *
   * @event select
   */
  select: function(event) {
   event.stopPropagation();
   this.selected = !this.selected;
 },

  toggleOpened: function() {
    if (!this.singleLine) {
      this.opened = !this.opened;
    } else {
      this.selected = !this.selected;
    };
  },

  _singleLineChanged: function(singleLine) {
    if (singleLine && this.opened) {
      this.opened = false;
    }
  },

  _openedChanged: function(opened) {
    if (opened && this.singleLine) {
      // single-line chips don't open
      this.opened  = false;
      return;
    }
    if (this.animated) {
      var $content, width, height;
                $content = this.$.content;
      width = height = '';
      if (this.opened) {
        // temporarily disable transitions in order to take measurements of
        // the content area, allowing for a proper css transision.
        this.animated = false;
        this.opened = true;
        width = $content.offsetWidth + 'px';
        height = $content.offsetHeight + 'px';
        this.opened = false;
        this._forceReflow();
        this.opened = true;
        this.animated = true;
      }
      $content.style.width = width;
      $content.style.height = height;
    }
  },

  _forceReflow: function() {
    return this.offsetHeight;
  }
});
