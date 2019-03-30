<template>

    <div class="xx-picker-col">
        <div ref="column" class="xx-picker-opts">
            <button v-for="(item,index) of column" :opt-index="index">{{item.name}}</button>
        </div>
    </div>

</template>
<style>
  .xx-picker-opts button{
        user-select: none;
        outline:none;
        transform-style: preserve-3d;
        color: inherit;
        font-size: 18px;
        line-height: 42px;
        padding:0;
        transform-origin: center center;
        height: 46px;
        background: transparent;
        left: 0;
        top: 0;
        display: block;
        position: absolute;
        width: 100%;
        border: 0;
        transition-timing-function: ease-out;
        text-overflow: ellipsis;
        white-space: nowrap;
        contain: strict;
        overflow: hidden;
        transform: translate3d(0px, -9999px, 90px);
    }
    .xx-picker-opts {
        color: inherit;
        font-size: 20px;
        line-height: 42px;
        top: 77px;
        position: relative;
        flex: 1;
        max-width: 100%;
    }
    .xx-picker-col{
        display: flex;
        flex: 1;
        justify-content: center;
        height: 100%;
        transform-style: preserve-3d;
        box-sizing: content-box;
        contain: content;
    }
</style>
<script>
const PICKER_OPT_SELECTED = 'picker-opt-selected';
const DECELERATION_FRICTION = 0.97;
const TRANSITION_DURATION = 150;

export default {
  name:'columns',
  props :{
      column:{
          default:[],
      },
      updateArr:{
          default:0
      }
  },
  watch: {
    column(column){
        this.column = column;
        this.y = 0;
        this.velocity = 0;
        this.lastIndex = -9999;
        this.componentsInt(false);
    }
  },
  mounted(){
        this.timeStamp = Date.now();
        this.columnsInit();
        this.componentsInt(true);
  },
  data () {
    return {
    bounceFrom: Number,
    lastIndex: Number,
    minY: Number,
    maxY :Number,
    optHeight : 0,
    velocity :0,
    startY:0,
    y:0,
    rotateFactor:0,
    timeStamp:'',
    }
  },
  methods: {
    componentsInt(fresher){
        this.optHeight = (this.$refs.column.firstElementChild ? this.$refs.column.firstElementChild.clientHeight : 46);
        this.rotateFactor = -0.46;
        this.update(0, 0, false, fresher);
    },
    columnsInit(){
        this.$el.addEventListener('touchstart',(ev)=>{
            ev.preventDefault();
            this.startY = this.pointerCoord(ev).y;
            const options = this.$refs.column.children;
            let minY = (options.length - 1);
            let maxY = 0;
            for (let i = 0; i < options.length; i++) {
                if (!options[i].disabled) {
                    minY = Math.min(minY, i);
                    maxY = Math.max(maxY, i);
                }
            }

            this.minY = -(minY * this.optHeight);
            this.maxY = -(maxY * this.optHeight);
        })
        this.$el.addEventListener('touchmove',(ev)=>{

            ev.preventDefault();
            ev.stopPropagation();

            var /** @type {?} */ currentY = this.pointerCoord(ev).y;
       
            var /** @type {?} */ y = this.y + (currentY - this.startY);

             if (y > this.minY) {
            y = Math.pow(y, 0.8);
            this.bounceFrom = y;
            } else if (y < this.maxY) {
            y += Math.pow(this.maxY - y, 0.9);
            this.bounceFrom = y;

            } else {
            this.bounceFrom = 0;
            }

            this.update(y, 0, false, false);
            
        })
        this.$el.addEventListener('touchend',(ev)=>{
            if (this.bounceFrom > 0) {
            this.update(this.minY, 150, false);
            return;
            } else if (this.bounceFrom < 0) {
            this.update(this.maxY, 150, false);
            return;
            }
            if (this.startY === null) {
                return;
            }
            var /** @type {?} */ endY = this.pointerCoord(ev).y;
   
            this.velocity = parseInt(endY - this.startY)/10;
         
            if (Math.abs(endY - this.startY) > 3) {
                
                var /** @type {?} */ y = this.y + (endY - this.startY);
                this.update(y, 0, true, false);
            }
            this.startY = null;
            this.decelerate();
        })
    },
    decelerate(){
      if (this.velocity !== 0) {
      this.velocity *= DECELERATION_FRICTION;
      this.velocity = (this.velocity > 0)
        ? Math.max(this.velocity, 1)
        : Math.min(this.velocity, -1);

      let y = this.y + this.velocity;

      if (y > this.minY) {
        y = this.minY;
        this.velocity = 0;

      } else if (y < this.maxY) {
        y = this.maxY;
        this.velocity = 0;
      }

      this.update(y, 0, true);
      const notLockedIn = (Math.round(y) % this.optHeight !== 0) || (Math.abs(this.velocity) > 1);
      if (notLockedIn) {
        this.rafId = requestAnimationFrame(() => this.decelerate());
         
      }


    } else if (this.y % this.optHeight !== 0) {
        
      const currentPos = Math.abs(this.y % this.optHeight);
   
      this.velocity = (currentPos > (this.optHeight / 2) ? 1 : -1);

      this.decelerate();
    }

    },
    update(y, duration, saveY, refresh)
    {
        y = Math.round(y);
        let translateY = 0;
        let translateZ = 0;
        const { rotateFactor } = this;
        const selectedIndex = this.indexForY(-y);

        var children = this.$el.children[0].children;
        
        const durationStr = (duration === 0) ? '' : duration + 'ms';
        for (let i = 0; i < children.length; i++) {
            const button = children[i];
            const opt = children[i];
            let transform = '';
            if(!opt.transform) opt.transform = 0;
            const optOffset = (i * this.optHeight) + y;
   
            const rotateX = optOffset * rotateFactor;
            if (Math.abs(rotateX) <= 90) {
                translateY = 0;
                translateZ = 90;
                transform = `rotateX(${rotateX}deg) `;
            } else {
                translateY = -9999;
            }

            const selected = selectedIndex === i;

            transform += `translate3d(0px,${translateY}px,${translateZ}px) `;
            opt.duration = duration;
            if (transform !== opt.transform) {
                opt.transform = rotateX;
                button.style.transform = transform;
            }

            opt.duration = duration;
            button.style.transitionDuration = durationStr;
            if (selected !== opt.selected) {
                opt.selected = selected;
                if (selected) {
                    button.className = PICKER_OPT_SELECTED;
                } else {
                    button.className = '';
                }
            }
        }
        if (saveY) {
            this.y = y;
        }
        if (this.lastIndex !== selectedIndex) {
            this.lastIndex = selectedIndex;
            this.$emit('change',{
                column:this.column[this.lastIndex],
                name:this.column[this.lastIndex].name,
                index:this.lastIndex,
                timeStamp:this.timeStamp,
                refresh:refresh
            });
    
        }
    },
    indexForY(y) {
        return Math.min(Math.max(Math.abs(Math.round(y / this.optHeight)), 0), this.column.length - 1);
    },
      /**
        * @param {?} ev
        * @return {?}
        */
    pointerCoord(ev) {
        // get coordinates for either a mouse click
        // or a touch depending on the given event
        if (ev) {
            var /** @type {?} */ changedTouches = ev.changedTouches;
            if (changedTouches && changedTouches.length > 0) {
                var /** @type {?} */ touch = changedTouches[0];
                return { x: touch.clientX, y: touch.clientY };
            }
            var /** @type {?} */ pageX = ev.pageX;
            if (pageX !== undefined) {
                return { x: pageX, y: ev.pageY };
            }
        }
        return { x: 0, y: 0 };
    }
  }
  }
   
</script>