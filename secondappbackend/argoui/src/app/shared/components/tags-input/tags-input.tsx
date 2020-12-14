import classNames from 'classnames';
import * as React from 'react';

//import {Autocomplete, AutocompleteApi, AutocompleteOption} from 'argo-ui';

export interface TagsInputProps {
    tags: string[];
    //autocomplete?: (AutocompleteOption | string)[];
    onChange?: (tags: string[]) => void;
    placeholder?: string;
}

require('./tags-input.scss');

export class TagsInput extends React.Component<TagsInputProps, {tags: string[]; input: string; focused: boolean}> {
    private inputElement: HTMLInputElement;
    //private autocompleteApi: AutocompleteApi;

    constructor(props: TagsInputProps) {
        super(props);
        this.state = {tags: props.tags || [], input: '', focused: false};
    }

    public render() {
        return (
            <div
                className={classNames('tags-input argo-field', {'tags-input--focused': this.state.focused || !!this.state.input})}
                onClick={() => this.inputElement && this.inputElement.focus()}>
                {this.props.tags ? (
                    this.props.tags.map((tag, i) => (
                        <span className='tags-input__tag' key={tag}>
                            {tag}{' '}
                            <i
                                className='fa fa-times'
                                onClick={e => {
                                    const newTags = [...this.state.tags.slice(0, i), ...this.state.tags.slice(i + 1)];
                                    this.setState({tags: newTags});
                                    this.onTagsChange(newTags);
                                    e.stopPropagation();
                                }}
                            />
                        </span>
                    ))
                ) : (
                    <span />
                )}
               
            </div>
        );
    }

    private onTagsChange(tags: string[]) {
        if (this.props.onChange) {
            this.props.onChange(tags);
            /*if (this.autocompleteApi) {
                setTimeout(() => this.autocompleteApi.refresh());
            }*/
        }
    }
}
