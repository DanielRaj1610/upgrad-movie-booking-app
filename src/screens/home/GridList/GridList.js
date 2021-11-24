import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './GridList.css';


const styles = theme => ({
    root: {
        height: '250px',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        margin: '1rem',
        display: 'flex',
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        height: '250px'
    },
    title: {
        color: '#ffffff',
    },
    titleBar: {
        background: 'linear-gradient(180deg, rgba(189,195,199,1) 0%, rgba(0,0,0,0.700717787114846) 100%)'
    },
    grid: {
        height: '250px !important',
        maxWidth: '300px'

    },

});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
const SingleLineGridList = (props) => {
    const { classes, data } = props;

    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
                {data.map((tile, index) => (
                    <GridListTile key={`${tile.img}-${index}`} classes={{ root: classes.grid }}>
                        <img src={tile.img} className='gridImage' alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            classes={{
                                root: classes.titleBar,
                                title: classes.title,
                            }}
                            actionIcon={
                                <IconButton>
                                    <StarBorderIcon className={classes.title} />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

SingleLineGridList.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};

export default withStyles(styles)(SingleLineGridList);